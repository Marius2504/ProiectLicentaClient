import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends GenericService<Event> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Event') }
}
