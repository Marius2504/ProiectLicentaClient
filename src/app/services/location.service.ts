import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Location } from 'src/app/models/Location.model';
@Injectable({
  providedIn: 'root'
})
export class LocationService extends GenericService<Location> {

  constructor(http:HttpClient) { super(http,'Location') }
}
