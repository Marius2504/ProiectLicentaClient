import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/Ticket.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends GenericService<Ticket> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Ticket') }
}
