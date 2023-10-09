import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { MessageModel } from 'src/app/Models/message-model';
import { User } from 'src/app/Models/user';
import { ChatService } from 'src/app/Services/chat.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatList: MessageModel[] = [];

  myUserId = 1; // esto lo cambiamos cuando se implementa la seguridad y el localStorage
  chatId = 1; // esto lo cambiamos cuando obtenemos la lista de mensajes por usuario

  message: MessageModel = new MessageModel();

  constructor(private chatService:ChatService){}

  ngOnInit(): void {
    this.getChatById(this.chatId);
  
  }

  getChatById(chatId:number){
    this.chatService.getChatById(chatId).subscribe(data =>{
      this.chatList = data;
      console.log(this.chatList)
    })
  }

  sendMessage(){
    const idLocal = localStorage.getItem("id")

    // this.message.senderUserId = this.myUserId; // Asigna el usuario que envía el mensaje
    if(idLocal != null){
      this.message.senderUserId = parseInt(idLocal); // Asigna el usuario de localStorage que envía el mensaje 
    } else this.message.senderUserId = this.chatId;

    this.chatService.sendMessage(this.chatId , this.message).subscribe(
      data => {
        console.log(data); 
        this.getChatById(this.chatId);
      },
      err => console.error(err)
    )
  }

  
  // =====================================
  // WEBSOCKETS



}
