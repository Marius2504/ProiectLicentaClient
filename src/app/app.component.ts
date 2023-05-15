import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  serverName ='';
  isButtonShown:boolean = false;


  constructor() {
    setTimeout(()=>{
      this.isButtonShown = true
    },2000)
  }
  changeTitle()
  {
    this.title = this.serverName
  }
  changeServer(event:Event)
  {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
