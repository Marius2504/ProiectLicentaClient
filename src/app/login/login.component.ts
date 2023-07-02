import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/Login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
 
  constructor(private authService:AuthService, private router:Router) {
  }
  username: string="";
  isAdmin: boolean=false;
  email: string="";
  password: string="";
  LoginFromComponent()
  {
    this.authService.login(new Login(this.email,this.password))
  }

}
