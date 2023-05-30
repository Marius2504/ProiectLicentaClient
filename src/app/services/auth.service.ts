import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/Login.model';
import { Register } from '../models/Register.model';
import { User } from '../models/User.model';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService implements OnInit {
  url:string = "https://localhost:7255/api/User"
  defaultUser:User = new User("","","",false,"","",false)
  loggedInUser :User | undefined
  
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http:HttpClient, private userService:UserService) {
    const token = localStorage.getItem("key");
    if(token != null)
    {
      this._isLoggedIn$.next(true);
    }
   }

   ngOnInit(): void {
    
   }
   getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.loggedInUser == undefined) {
        const token = localStorage.getItem("key");
        if (token != null) {
          var decodedToken = this.getDecodedAccessToken(token);
          var email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          this.userService.GetByEmail(email).subscribe(resp => {
            this.loggedInUser = resp;
            this._isLoggedIn$.next(true);
            resolve(this.loggedInUser);
          });
        } else {
          reject("No token found");
        }
      } else {
        resolve(this.loggedInUser);
      }
    });
  }
  

  login(entity:Login)
  {
    this.http.post<{key:string,token:string}>(this.url + '/login', entity).subscribe(response =>{
      this.storeToken(response)
      
      this.userService.GetByEmail(entity.email).subscribe(resp =>{
        this._isLoggedIn$.next(true);

      })

    },error =>{
      console.log(error)
    })
  }
  logout()
  {
    //this.isLoggedIn = false;
    if(localStorage.getItem("key") !="")
      localStorage.removeItem("key")
      this.loggedInUser =undefined
  }
  register(entity:Register)
  {
    this.http.post<{status:string,message:string}>(this.url + '/register', entity).subscribe(response =>{
      console.log(response.status)
    },error =>{
      console.log(error)
    })
  }
  storeToken(data:{key:string,token:string})
  {
    if(localStorage.getItem("key") !="")
      localStorage.removeItem("key")

    localStorage.setItem("key",data.token)
  }

  isAuthenticated()
  {
    //return this.isLoggedIn;
    return true;
  }
  isAdmin()
  {
    // acceseaza localstorage si citeste tokenul. Se verifica mai apoi daca este admin
    // O eroare ar putea sa fie daca user-ul are mai mutle roluri
    var token= localStorage.getItem("key");
    if(token !=null){
      var decodedToken = this.getDecodedAccessToken(token);
      console.log(decodedToken);
      var roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      if(roles == "Admin")
      {
        return true;
      }
    }
    return false;
  }
  isArtist()
  {
    var token= localStorage.getItem("key");
    if(token !=null){
      var decodedToken = this.getDecodedAccessToken(token);
      var roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      if(roles == "Artist" || roles == "Admin")
      {
        return true;
      }
    }
    return false;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
