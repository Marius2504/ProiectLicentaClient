import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends GenericService<Genre> {

  constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Genre') }
}
