import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Album } from "../models/Album.model";
import { GenericService } from "./generic.service";

@Injectable({ providedIn: 'root'})
export class AlbumService extends GenericService<Album>   {
    constructor(http:HttpClient) { super(http,'https://localhost:7255/api/Album') }
}