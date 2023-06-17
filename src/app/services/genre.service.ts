import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends GenericService<Genre> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Genre') }

  GetWithSongs(id: number) {
    return this.http.get<Genre>(this.url + '/allsongs/' + id)
  }
  UploadImage(formData:FormData)
  {
    return this.http.post("https://localhost:7255/api" +'/Upload/Genre', formData, {reportProgress: true, observe: 'events'})
  }
}
