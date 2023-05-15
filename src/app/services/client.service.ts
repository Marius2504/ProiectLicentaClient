import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService<Client> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Client') }
}
