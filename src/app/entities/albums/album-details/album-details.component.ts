import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  slideCountSongs = 0;

  constructor(private route:ActivatedRoute,
     private songService:SongService,
     private artistService:ArtistService,
     private albumService:AlbumService,
     private router:Router
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
      },error =>{
        this.router.navigate(['/404'])
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
  slideSongsLeft(): void {
    this.slideCountSongs++;
    this.slide("song",this.slideCountSongs)
  }
  slideSongsRight(): void {
    this.slideCountSongs--;
    this.slide("song",this.slideCountSongs)
  }
  slide(element:string,slideCount:number)
  {
    const elements = document.querySelectorAll('.'+element) as NodeListOf<HTMLElement>;
    const translateX = -100 * slideCount;

    elements.forEach((element) => {
      element.style.transform = `translateX(${translateX}%)`;
    });
  }

}
