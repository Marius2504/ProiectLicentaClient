import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../models/Register.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService:AuthService,
    private userService:UserService,
    private router:Router) {
    }
  
  register = new Register();
  confirmPassword: string="";
  terms:boolean = true;

  emailError:boolean = true;
  passwordError:boolean = true;
  emailOrName:boolean = false;
  RegisterFromComponent()
  {
    console.log(this.register.email);
    console.log(this.validateEmail());
    this.emailError = this.validateEmail();
    this.passwordError = this.validatePassword();
    if(this.register.username !=""
      && this.register.email !=""
      && this.register.password!=""
      && this.confirmPassword !=""
      && this.terms == true)
      {
        if(this.validateEmail() == true && this.validatePassword() && this.ValidateConfirmPassword())
        {
          this.check();
        }
      }
  }
  validateEmail():boolean {
    if(String(this.register.email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ))
      {
        return true;
    }
    return false
  };
  validatePassword():boolean{
    if(String(this.register.password)
    .match(/^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.{6,})/)){
      return true;
    }
    return false;
  }

  ValidateConfirmPassword():boolean{
    return this.register.password == this.confirmPassword;
  }

  check() {
    this.userService.GetByEmail(this.register.email).subscribe(
      resp => {
        this.userService.GetByName(this.register.username).subscribe(
          name => {
            if (resp != null && name != null) {
              this.emailOrName = true;
            }
          },
          error => {
            this.emailOrName = false;
            this.registerUser();
           // this.router.navigate(['/']);
          }
        );
      },
      error => {
        this.emailOrName = false;
        this.registerUser();
        //this.router.navigate(['/']);
      }
    );
  }
  registerUser()
  {
    this.authService.register(this.register);
  }
 
}
