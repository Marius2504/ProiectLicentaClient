import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  user: User = new User("","","",false,"","",false); 
  id:string = "";
  constructor(private userService:UserService, private authService:AuthService, private route:ActivatedRoute){
  }
  
  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      //daca id-ul este undefined, se ia userul logat
      if(this.id !=undefined && this.id!=null){
          this.userService.GetByStringId(this.id).subscribe(resp=>{
            this.user=resp;
          })
        }
        else{
          this.authService.getUser().then(result =>{
            this.user = result
          })
          .catch(error => console.log(error));
          
        }

      }
     
    )
    
  }

  Update()
  {
    this.userService.Update(this.user).subscribe(Response =>{
      this.user = Response
    })
  }
  
}
