import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-network-front';

  public getUserIdFromLocalStorage(): number{
    const idLocal = localStorage.getItem("id");
    if (idLocal != null) return parseInt(idLocal); 
    else return -1;
  }

}
