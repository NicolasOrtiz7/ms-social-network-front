import { Component, OnInit } from '@angular/core';
import { Like } from 'src/app/Models/like';
import { Post } from 'src/app/Models/post';
import { User } from 'src/app/Models/user';
import { PostService } from 'src/app/Services/post.service';
import { DatePipe } from '@angular/common';
import { Comment } from 'src/app/Models/comment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postList: Post[] = [];
  comment: string;

  constructor(private postService: PostService, private datePipe: DatePipe, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(
      async data => {
        this.postList = data;

        // Busca los likes y comentarios del Post
        for (const post of this.postList) {
          let likeList = await this.postService.getLikesByPostId(post.id).toPromise();
          post.likes = likeList ?? []; // Utilizar el operador nullish para asignar un array vacío si like es undefined

          let commentList = await this.postService.getCommentsByPostId(post.id).toPromise();
          post.comments = commentList ?? [];
        }
        console.log(this.postList)
      }
    )
  }

  getLikesByPostId(postId: number) {
    this.postService.getLikesByPostId(postId).subscribe(data => {})
  }
  getCommentsByPostId(postId: number) {
    this.postService.getCommentsByPostId(postId).subscribe(data => {})
  }


  // -----------------------------------------

  sendComment(postId: number){

    if(this.comment.length > 0){
      console.log("entra");
      

      const newComment = new Comment();
      const post = new Post();

      post.id = postId;

      newComment.comment = this.comment;

      const myUserId = this.appComponent.getUserIdFromLocalStorage();
      newComment.userId = myUserId;

      console.log("Comentario a enviar");
      console.log(newComment);
      
      


      this.postService.sendComment(postId, newComment).subscribe(
        data => {
          console.log("Comentario enviado");
          this.comment = "";
          this.getAllPosts();
          
        },
        err => console.log(err)
      )
    }


  }

}
