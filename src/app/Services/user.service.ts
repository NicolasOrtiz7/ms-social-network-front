import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = "http://localhost:8080/users"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.URL);
  }

  getUserById(userId:number): Observable<User>{
    return this.http.get<User>(this.URL + "/" + userId);
  }

}
