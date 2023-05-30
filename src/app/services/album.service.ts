import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Album } from "../models/Album.model";
import { GenericService } from "./generic.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AlbumService extends GenericService<Album>   {
    constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Album') }

    getAllAlbumsOfArtist(id:number): Observable<Album[]> {
        return this.http.get<Album[]>(this.url+ '/artist/' + id)
    }
    
}