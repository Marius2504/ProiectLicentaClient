import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Message } from '../models/Message.model';
import { environment } from '../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url: string = environment.apiUrl
  constructor(private http:HttpClient){}

  AddMessage(entity: Message) {
    
    return this.http.post<Message>(this.url + 'Song/addMessage', entity)
  }
  AddLike(userId:string,messageId:number)
  {
    return this.http.post<Message>(this.url + 'User/message/addLike/'+userId + '/' +messageId, {})
  }
  RemoveLike(userId:string,messageId:number)
  {
    return this.http.post<Message>(this.url + 'User/message/removeLike/'+userId + '/' +messageId, {})
  }
  DeleteMessage(id:number,songId:number)
  {
    console.log(this.url+ 'Song/removeMessage/' + songId + '/' + id)
    return this.http.delete<Message>(this.url+ 'Song/removeMessage/' + songId + '/' + id)
  }

  
}
