import { Component, ElementRef, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { timeout } from 'rxjs';
import { MessageModel } from 'src/app/Models/message-model';
import { User } from 'src/app/Models/user';
import { ChatService } from 'src/app/Services/chat.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from '@stomp/stompjs';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/Services/user.service';
import { Chat } from 'src/app/Models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatList: MessageModel[] = [];       // Lista de mensajes
  usersList: User[] = [];              // Lista de usuarios/amigos

  myUserId: number;                   // esto lo cambiamos cuando se implementa la seguridad
  currentChat: Chat = new Chat(-1);

  currentChatName: string = "Chat";          // Para mostrar el nombre del usuario con el que estoy chateando

  message: MessageModel = new MessageModel();

  constructor(
    @Inject(LOCALE_ID) private locale: string, // poner idioma en español (fechas del chat)
    private datePipe: DatePipe,

    private appComponent: AppComponent,

    private chatService: ChatService,
    private userService: UserService
  ) {

    this.locale = 'es-ES'; // Establece la configuración regional en español
  }

  ngOnInit(): void {
    this.myUserId = this.appComponent.getUserIdFromLocalStorage(); // Obtiene el Id de mi usuario
    this.getAllUsers() // Obtiene todos los usuarios registrados. Cambiar por getFriends()

  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data;
      console.log(data)
    })
  }

  // Al presionar para abrir el chat con un amigo, verifica si ya están cargados los mensajes
  verifyIfCurrentChatIsLoaded(receiverUser: number) {
    this.message.content = "";
    let a = this.currentChat.senderUserId;
    let b = this.currentChat.receiverUserId;

    if ((a === this.myUserId && b === receiverUser) || (b === this.myUserId && a === receiverUser)) console.log("Los mensajes ya están cargados.");
    // si no están cargados, verifica si el chat existe y los carga
    else this.getChatIfExists(receiverUser);

  }

  // Al presionar para abrir el chat con un amigo, verifica si existe un chat y carga los mensajes
  getChatIfExists(receiverUser: number) {
    this.chatService.getChatIfExists(this.myUserId, receiverUser).subscribe((data: Chat) => {

      this.currentChat = data; // Guarda el chat en una variable para no cargarlo en cada click

      this.currentChatName = this.currentChat.receiverUser.name; // Solo sirve para mostrar el nombre del usuario con el que estoy chateando en el botón del dropdown, porque de la otra forma ocasionaba un bug

      this.getChatById(this.currentChat.id); // Obtiene los mensajes con el usuario

      this.scrollToBottom(); // Baja el scrollbar del chat hasta el último mensaje
    }
    )
  }

  getChatById(chatId: number) {
    const idLocal = this.appComponent.getUserIdFromLocalStorage();
    if (idLocal == -1) return alert("Inicia sesión nuevamente")

    this.chatService.getChatById(chatId).subscribe(messages => {
      this.chatList = this.formatMessages(messages);
      console.log(this.chatList);

    });
  }


  sendMessage() {
    if (this.myUserId == -1) return alert("Inicia sesión nuevamente");

    this.message.senderUserId = this.myUserId;
    this.message.chatId = this.currentChat.id;

    console.log("Mensaje a enviar:");
    
    console.log(JSON.stringify(this.message));
    

    this.chatService.sendMessage(this.currentChat.id, this.message).subscribe(
      data => {
        console.log(data);
        this.message = new MessageModel();
        this.getChatById(this.currentChat.id);
      },
      err => console.error(err)
    )
  }

  // =====================================

  private formatMessages(messages: MessageModel[]): MessageModel[] {
    return messages.map(message => {
      const fecha = new Date(message.datetime);
      message.datetimeFormatted = this.datePipe.transform(fecha, 'dd MMM y HH:mm a');
      return message;
    });
  }



  // =====================================
  // Modificar HTML

  // Bajar el scrollbar del chat
  // Este metodo es el que me da error al apretar los chats
  @ViewChild('chatBody') private chatBody: ElementRef;
  scrollToBottom(): void {
    this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
  }

  closeChat() {
    let boton = document.getElementById("dropdown");
    boton?.click();
  }

  // =====================================
  // WEBSOCKETS
}
