import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  currentUser:User|undefined
  id:number = 0
  constructor(private route:ActivatedRoute, private userService:UserService){}

  ngOnInit(): void {
    console.log(this.route.snapshot)
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      if(this.id !=undefined && this.id!=null){
        this.userService.Get(this.id).subscribe(response =>{
          this.currentUser = response;
        })
      }
    })
  }

}
