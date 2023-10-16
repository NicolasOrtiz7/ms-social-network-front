import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Models/post';
import { Like } from '../Models/like';
import { Comment } from '../Models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  URL = "http://localhost:8080/posts"

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.URL);
  }

  getPostById(postId: number): Observable<Post>{
    return this.http.get<Post>(this.URL + "/post/" + postId);
  }

  getLikesByPostId(postId: number): Observable<Like[]>{
    return this.http.get<Like[]>(this.URL + "/post/" + postId + "/likes");
  }

  getCommentsByPostId(postId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.URL + "/post/" + postId + "/comments");
  }

  sendComment(postId: number, comment: Comment){
    return this.http.post(this.URL + "/post/" + postId + "/comment", comment);
  }

  sendLikes(postId: number, like: Like){
    return this.http.post(this.URL + "/post/" + postId + "/like", like);
  }

}
