import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../models/Song.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SongService extends GenericService<Song>{
  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Song') }
}
