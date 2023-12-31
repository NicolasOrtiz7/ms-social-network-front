import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { ChatComponent } from './Components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './Components/post/post.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChatComponent,
    PostComponent,
    ProfileComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe, 
    { provide: LOCALE_ID, useValue: 'es-ES' }, // Establece la configuración regional en español
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
