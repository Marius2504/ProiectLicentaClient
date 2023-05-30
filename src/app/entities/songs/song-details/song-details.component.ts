import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Genre } from 'src/app/models/Genre.model';
import { Song } from 'src/app/models/Song.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { GenreService } from 'src/app/services/genre.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {
  currentSong:Song = new Song("",0,"","",0,0,0,0)
  artist:Artist = new Artist(0,"","","",[],[],[])
  album:Album = new Album(0,"","","",0,0)
  genre:Genre = new Genre(0,"")
  id:number = 0
  constructor(private route:ActivatedRoute,
     private songService:SongService,
     private artistService:ArtistService,
     private albumService:AlbumService,
     private genreService:GenreService){

  }
 
  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      if(this.id !=undefined && this.id!=0){
        this.getSong()
      }
    })
  }
  getSong()
  {
    this.songService.Get(this.id).subscribe(response =>{
      
      this.currentSong = response;
      this.songService.setCurrentSong(response);
      this.getArtist();
      this.getAlbum();
      this.getGenre();

    })
  }

  getArtist()
  {
    this.artistService.Get(this.currentSong.artistId).subscribe(response=>{
      this.artist = response
  
    })
  }
  getAlbum()
  {
    this.albumService.Get(this.currentSong.albumId).subscribe(Response =>
      {
        this.album=Response;
      })
  }
  getGenre()
  {
    this.genreService.Get(this.currentSong.genreId).subscribe(Response=>{
      this.genre=Response;
    })
  }

}
