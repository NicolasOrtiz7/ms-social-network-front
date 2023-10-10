import { Component, ElementRef, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { timeout } from 'rxjs';
import { MessageModel } from 'src/app/Models/message-model';
import { User } from 'src/app/Models/user';
import { ChatService } from 'src/app/Services/chat.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from '@stomp/stompjs';
import { DatePipe } from '@angular/common';

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

  constructor(
    @Inject(LOCALE_ID) private locale: string, // poner idioma en español
    private chatService:ChatService, 
    private datePipe: DatePipe){
      
    this.locale = 'es-ES'; // Establece la configuración regional en español
  }

  @ViewChild('chatBody') private chatBody: ElementRef;
  scrollToBottom(): void {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
 }

  ngOnInit(): void {
    this.getChatById(this.chatId);



    setTimeout(() => { // este metodo ejecutarlo cuando se abre un nuevo chat
      this.scrollToBottom();
    }, 2000);
  }

  getChatById(chatId:number){
    this.chatService.getChatById(this.chatId).subscribe(messages => {
      this.chatList = this.formatMessages(messages);
      console.log(this.chatList);
      
    });
  }
  private formatMessages(messages: MessageModel[]): MessageModel[] {
    return messages.map(message => {
      const fecha = new Date(message.datetime);
      message.datetimeFormatted = this.datePipe.transform(fecha, 'dd MMM y HH:mm a');
      return message;
    });
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
