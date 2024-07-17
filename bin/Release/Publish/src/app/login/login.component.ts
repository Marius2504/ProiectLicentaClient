import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/Login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{
  @ViewChild("wrapper") wrapper: ElementRef<HTMLElement> | undefined;
  constructor(private authService:AuthService, private router:Router) {
  }

  ngAfterViewInit(): void {
    console.log(this.wrapper)
    this.authService.wrongPass$.subscribe(resp =>{
      if(this.isWrong == true)
      {
        this.wrapper?.nativeElement.classList.toggle("wrong")
      }
    })
  }
  username: string="";
  isAdmin: boolean=false;
  email: string="";
  password: string="";
  isWrong:boolean=false;
  LoginFromComponent()
  {
    this.authService.login(new Login(this.email,this.password))
  }

}
