import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Album } from "../models/Album.model";
import { GenericService } from "./generic.service";
import { Observable } from "rxjs";
import { environment } from "../enviroments/enviroments";

@Injectable({ providedIn: 'root'})
export class AlbumService extends GenericService<Album>   {
    constructor(http:HttpClient) { super(http,'Album') }

    getAllAlbumsOfArtist(id:number): Observable<Album[]> {
        return this.http.get<Album[]>(this.url+ '/artist/' + id)
    }
    UploadImage(formData:FormData)
  {
    console.log(environment.apiUrl +'Upload/Album')
    return this.http.post(environment.apiUrl +'Upload/Album', formData, {reportProgress: true, observe: 'events'})
    
  }
    
}