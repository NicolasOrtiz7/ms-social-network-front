import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel } from '../Models/message-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  URL:string = "http://localhost:8080/chats/"

  constructor(private http:HttpClient) { 
  }

  getChatById(chatId:number): Observable<MessageModel[]>{
    return this.http.get<MessageModel[]>(this.URL + "/chat/" + chatId);
  }

  sendMessage(chatId:number, message:MessageModel) : Observable<MessageModel[]>{
    return this.http.post<MessageModel[]>(this.URL + "/chat/" + chatId, message);
  }

  // =====================================
  // WEBSOCKETS

}
 
