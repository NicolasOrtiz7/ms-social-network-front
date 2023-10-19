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

  post: Post = new Post();
  postList: Post[] = [];

  newPostContent: string;
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
        console.log("HOALA");
        
        console.log(this.postList)
      }
    )
  }

  getPostById(postId: number) {
    this.postService.getPostById(postId).subscribe(async data => {
      this.post = data;

      // Obtener likes y comentarios actualizados
      let postLikes = await this.postService.getLikesByPostId(postId).toPromise();
      this.post.likes = postLikes ?? [];
      let postComments = await this.postService.getCommentsByPostId(postId).toPromise();
      this.post.comments = postComments ?? [];

      // Actualizar el post dentro de postList[]
      const index = this.postList.findIndex(item => item.id == this.post.id);
      if (index !== -1) this.postList[index] = this.post;

    })
  }

  getLikesByPostId(postId: number) {
    this.postService.getLikesByPostId(postId).subscribe(data => { this.post.likes = data })
  }
  getCommentsByPostId(postId: number) {
    this.postService.getCommentsByPostId(postId).subscribe(data => { })
  }


  // -----------------------------------------

  sendPost(){

    if(this.newPostContent.length > 0){

      const myUserId = this.appComponent.getUserIdFromLocalStorage();
      const newPost = new Post(); 
      
      newPost.userId = myUserId;
      newPost.description = this.newPostContent;
  
      this.postService.sendPost(newPost).subscribe(
        data => {
          this.newPostContent = "";
          this.getAllPosts();
        }
      )
    }
  }

  sendComment(postId: number) {

    if (this.comment.length > 0) {
      const post = new Post();
      const newComment = new Comment();
      const myUserId = this.appComponent.getUserIdFromLocalStorage();

      post.id = postId;
      newComment.comment = this.comment;
      newComment.userId = myUserId;

      this.postService.sendComment(postId, newComment).subscribe(
        data => {
          this.comment = "";
          this.getPostById(postId);
        },
        err => console.log(err)
      )
    }
  }

  sendLike(postId: number){
    const post = new Post();
    const newLike = new Like();
    const myUserId = this.appComponent.getUserIdFromLocalStorage();

    post.id = postId;
    newLike.post = post;
    newLike.userId = myUserId;

    this.postService.sendLikes(postId, newLike).subscribe(
      data => {
        this.getPostById(postId);
      }
    )

  }

}
