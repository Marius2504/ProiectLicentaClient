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
    this.userService.GetAllUsers().subscribe(resp =>{
      this.users = resp;
      console.log(this.users)
    })
  }
}
