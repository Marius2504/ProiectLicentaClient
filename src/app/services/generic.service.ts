import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> {
  //override the url for every service
  public url: string = ""
  constructor(protected http: HttpClient, protected urlPassed: string) { this.url = urlPassed }

  Add(entity: T) {
    console.log(this.url)
    return this.http.post<T>(this.url, entity)
  }
  Get(id: number) {
    return this.http.get<T>(this.url + '/' + id)
  }
  GetByName(name:string){
    return this.http.get<T>(this.url + '/' + name)
  }
  GetAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url)
  }
  Update(entity: T) {
    return this.http.put<T>(this.url + '/update', entity)
  }
  Delete(id: number) {
    return this.http.delete<T>(this.url + '/delete/' + id)
  }
}
