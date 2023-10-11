import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel } from '../Models/message-model';
import { Observable } from 'rxjs';
import { Chat } from '../Models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  URL:string = "http://localhost:8080/chats"

  constructor(private http:HttpClient) { 
  }


  getChatIfExists(user1:number, user2:number): Observable<Chat>{
    return this.http.get<Chat>(this.URL + `/chat/search/${user1}/${user2}`);
  }

  getChatById(chatId:number): Observable<MessageModel[]>{
    return this.http.get<MessageModel[]>(this.URL + "/chat/" + chatId);
  }

  sendMessage(chatId:number, message:MessageModel) : Observable<MessageModel[]>{
    return this.http.post<MessageModel[]>(this.URL + "/chat/" + chatId, message);

    // Si lo envío directamente al servie funciona
    // return this.http.post<MessageModel[]>("http://localhost:8001/chats/chat/" + chatId, message);
  }

  // =====================================
  // WEBSOCKETS

}
 
