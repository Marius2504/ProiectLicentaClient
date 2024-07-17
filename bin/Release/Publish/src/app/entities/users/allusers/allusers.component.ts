import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent {
  users:User[] = []
  progress: number=0;
  message: string="";
  
  constructor(private http: HttpClient, private userService:UserService) { }
  ngOnInit() {
    this.getUsers()
  }
  getUsers()
  {
    this.userService.GetAllUsers().subscribe(resp =>{
      this.users = resp;
      console.log(this.users)
    })
  }
  replaceImage(index:number)
  {
    console.log("da")
    this.users[index].imagePath = "../../../../assets/user.png";
  }
  deleteItem(id:string)
  {
    if (confirm("Are you sure you want to delete this user?")) {
    this.userService.deleteUser(id).subscribe(resp =>{
      this.getUsers();
    })}
  }
}
