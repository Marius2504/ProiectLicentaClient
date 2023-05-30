import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/User') }

  GetByEmail(email:string){
    return this.http.get<User>(this.url + '/email/' + email)
  }
  GetByStringId(id: string) {
    return this.http.get<User>(this.url + '/' + id)
  }
}