import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response: {dbPath: ''} = {dbPath: ''};
  name: string ="";
  address: string="";
  user: UserToCreate=new UserToCreate();
  users: User[] = [];
  
  uploadFinished = (event:any) => { 
    this.response = event; 
    console.log(this.response);
  }
  onCreate = () => {
    this.user = {
      name: this.name,
      address: this.address,
      imgPath: this.response.dbPath
    }
  }

}
class UserToCreate {
  name: string="";
  address: string="";
  imgPath: string="";
}
class User {
  id: string=""
  name: string=""
  address: string=""
  imgPath: string=""
}