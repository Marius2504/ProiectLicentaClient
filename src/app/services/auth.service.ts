import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login.model';
import { Register } from '../models/Register.model';

@Injectable()
export class AuthService {
  url:string = "https://localhost:7255/api/User"
  constructor(private http:HttpClient) { }

  login(entity:Login)
  {
    console.log(entity)
    this.http.post<{key:string,token:string}>(this.url + '/login', entity).subscribe(response =>{
      this.storeToken(response)
    },error =>{
      console.log(error)
    })
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
    localStorage.setItem("key",data.token)
  }
}
