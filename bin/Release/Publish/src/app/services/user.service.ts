import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../models/Song.model';
import { User } from '../models/User.model';
import { GenericService } from './generic.service';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  constructor(http:HttpClient) { super(http,'User') }

  GetByEmail(email:string){
    return this.http.get<User>(this.url + '/email/' + email)
  }
  GetByStringId(id: string) {
    return this.http.get<User>(this.url + '/' + id) 
  }
  GetAllUsers(){
    return this.http.get<User[]>(this.url + '/all')
  }
  UploadImage(formData:FormData,userId:string)
  {
    return this.http.post(environment.apiUrl +'Upload/Profile', formData, {reportProgress: true, observe: 'events'})
  }
  
  addLike(song:Song,userId:string)
  {
    return this.http.post<Song>(this.url+ '/addLike/' + userId + '/' + song.id,{})
  }
  removeLike(song:Song,userId:string)
  {
    return this.http.post<Song>(this.url+ '/removeLike/' + userId + '/' + song.id,{})
  }
  deleteUser(id:string){
    return this.http.delete<User>(this.url + '/delete/' + id)
  }
  
}