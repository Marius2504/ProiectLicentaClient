import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Song } from 'src/app/models/Song.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  songs:Song[] = []
  artist:Artist= new Artist()
  album:Album = new Album()
  albumLikes:number = 0;
  id:number = 0

  constructor(private route:ActivatedRoute,
     private songService:SongService,
     private artistService:ArtistService,
     private albumService:AlbumService
     ){

  }
 
  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      if(this.id !=undefined && this.id!=0){
        this.getAlbum()
        
      }
    })
  }
  
  getAlbum()
  {
    this.albumService.Get(this.id).subscribe(Response =>
      {
        console.log(Response)
        this.album=Response;
        this.getSongs();
        this.getArtist()
      })
  }
  getSongs()
  {
    this.songService.getAllSongsOfAlbum(this.id).subscribe(response =>{
      this.songs = response;
    })
  }
  getArtist()
  {
    this.artistService.Get(this.album.artistId).subscribe(Response=>{
      this.artist = Response;
    })
  }

}
