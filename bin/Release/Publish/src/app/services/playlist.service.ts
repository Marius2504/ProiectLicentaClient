import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/Playlist.model';
import { Song } from '../models/Song.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends GenericService<Playlist> {

  constructor(http:HttpClient) { super(http,'Playlist') }

  
}
