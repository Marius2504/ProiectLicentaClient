import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '../models/Playlist.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends GenericService<Playlist> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Playlist') }
}