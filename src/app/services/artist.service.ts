import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '../models/Artist.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends GenericService<Artist> {

  constructor(http:HttpClient) { 
    super(http,'Artist') }

  getArtistOfUser(id:string){
    return this.http.get<Artist>(this.url + '/user/' + id)
  }
  
}
