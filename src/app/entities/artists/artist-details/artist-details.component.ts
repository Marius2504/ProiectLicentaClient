import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Song } from 'src/app/models/Song.model';
import { Event } from 'src/app/models/Event.model';
import { Location } from 'src/app/models/Location.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { EventService } from 'src/app/services/event.service';
import { SongService } from 'src/app/services/song.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit{
  artist:Artist = new Artist()
  songs:Song[] = []
  albums:Album[] = []
  events:Event[] = []
  locations:Location[] =[]
  id:number = 0
  constructor(private route:ActivatedRoute,
     private songService:SongService,
     private artistService:ArtistService,
     private albumService:AlbumService,
     private eventService:EventService,
     private locationService:LocationService
     ){

  }
  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      if(this.id !=undefined && this.id!=0){
        this.getArtist()
      }
    })
  }
  getArtist()
  {
    this.artistService.Get(this.id).subscribe(response =>{
      this.artist = response;
      this.getSongs();
      this.getAlbums();
      this.getEvents();
    })
  }
  getSongs()
  {
    this.songService.getAllSongsOfArtist(this.id).subscribe(response =>{
      this.songs = response;
    })
  }
  getAlbums()
  {
    this.albumService.getAllAlbumsOfArtist(this.id).subscribe(response =>{
      this.albums = response;
    })
  }
  getEvents()
  {
    this.eventService.getAllEventsOfArtist(this.id).subscribe(response =>{
      this.events = response;
      this.getLocations();
    })
  }
  getLocations()
  {
    this.events.forEach(event => {
      this.locationService.Get(event.locationId).subscribe(resp =>{
        this.locations.push(resp)
      })
    });
  }

}
