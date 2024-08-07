import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Album } from "../models/Album.model";
import { GenericService } from "./generic.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AlbumService extends GenericService<Album>   {
    constructor(http:HttpClient) { super(http,'Album') }

    getAllAlbumsOfArtist(id:number): Observable<Album[]> {
        console.log(this.url+ '/artist/' + id)
        return this.http.get<Album[]>(this.url+ '/artist/' + id)
    }
    UploadImage(formData:FormData)
  {
    return this.http.post(this.defaultUrl +'Upload/Album', formData, {reportProgress: true, observe: 'events'})
  }
    
}