import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit{
  @Input() currentItem= new Album()
  artist:Artist = new Artist()

  constructor(private artistService:ArtistService,private router:Router , private albumService:AlbumService){ }
  ngOnInit(): void {
    this.getArtist()
  }

  getArtist()
  {
    if(this.currentItem!=undefined){
      
      this.artistService.Get(this.currentItem.artistId).subscribe(response=>{
        this.artist = response
    
      })
    }
  }
  navigateToDetails() {
   
    if (this.currentItem != undefined && this.currentItem != null) {
      this.router.navigate(['album', this.currentItem.id]);
    }
  }

  /*
  @Input() currentItem = new Album(0,"","","",0,0)
  album:Album = this.currentItem;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.album)
    this.album = this.currentItem
  }
  
  /*
  artist:Artist = new Artist(0,"","","",[],[],[])

  
  */
}
