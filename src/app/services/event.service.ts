import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/Event.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends GenericService<Event> {

  constructor(http:HttpClient) { super(http,'Event') }

  getAllEventsOfArtist(id:number): Observable<Event[]> {
    return this.http.get<Event[]>(this.defaultUrl + this.url+ '/artist/' + id)
  }
  AddArtist(eventId:number,artistId:number):Observable<Event>
  {
    return this.http.post<Event>(this.defaultUrl +this.url+ '/artist/add/' + eventId + '/' + artistId,{})
  }
  RemoveArtist(eventId:number,artistId:number):Observable<Event>
  {
    return this.http.post<Event>(this.defaultUrl +this.url+ '/artist/remove/' + eventId + '/' + artistId,{})
  }
}
