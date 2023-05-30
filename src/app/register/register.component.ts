import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../models/Register.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService:AuthService,private router:Router) {
    authService.isAdmin()
  }
  username: string="";
  isAdmin: boolean=false;
  email: string="";
  password: string="";
  confirmPassword: string="";
  terms:boolean = false;
  displayErrorMatch:boolean=false;
  termsError:boolean=false;
  passwordError:boolean=false;
  emailError:boolean=false;
  RegisterFromComponent()
  {
    if(this.VerifyPassword() && this.password.length>5 && this.terms == true)
    {
      this.authService.register(new Register(this.username,this.email,this.password,this.isAdmin))
      this.router.navigate(['../']);
    }
    this.displayErrorMatch =!this.VerifyPassword();
    this.emailError =!this.validateEmail(this.email);
    this.termsError =this.terms
    if(this.password.length<6)
    {
      this.passwordError = true;
    }
    else{
      this.passwordError = false;
    }
  }
  VerifyPassword():boolean
  {
    return this.password==this.confirmPassword;
  }
  validateEmail(email:string):boolean {
    if(String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
        return true;
      }
      return false
  };
 
}
