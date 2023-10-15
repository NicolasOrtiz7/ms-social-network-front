import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  myUserId: number = this.appComponent.getUserIdFromLocalStorage();

  user: User = new User();

  recommendedUsers: User[] = [];

  constructor(
    private userService: UserService,
    private appComponent: AppComponent
    ){}


  ngOnInit(): void {
    this.getMyUser();
    this.getAllUsers();
  }

  getMyUser(){
      this.userService.getUserById(this.myUserId).subscribe(data =>{
        this.user = data;

        console.log(data);
        console.log("NO DEBERIA DEVOLVER LA CONTRASEÑA, CAMBIAR A DTO");  
      })
  }

  getAllUsers(){ // Cambiar por "Usuarios que No son Amigos"
    this.userService.getAllUsers().subscribe(data => {
      this.recommendedUsers = data;
      console.log(this.recommendedUsers);
    }
    )
  }

}
