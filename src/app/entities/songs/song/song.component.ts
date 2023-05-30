import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/models/Artist.model';
import { Song } from 'src/app/models/Song.model';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit,AfterViewInit {
  @Input() currentItem: Song = new Song("",0,"","",0,0,0,0)
  @ViewChild('buttonId') button: ElementRef<HTMLElement> | undefined;
  @ViewChild('image') image: ElementRef<HTMLElement> | undefined;
  artist:Artist = new Artist(0,"","","",[],[],[])
  playStatus:string = "play";
  constructor(private router: Router, private songService: SongService, private artistService:ArtistService) {
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.getActualSong();
    this.getArtist();
  }

  getArtist()
  {
    if(this.currentItem!=undefined){
      
      this.artistService.Get(this.currentItem.artistId).subscribe(response=>{
        this.artist = response
    
      })
    }
  }
  getActualSong()
  {
    
    this.songService.currentSong.subscribe(Response =>{
      if(Response.id == this.currentItem.id)
      {
        this.songService.playStatus.subscribe( resp =>{
          this.playStatus = resp;
          this.setButton();
        })
      }
    })
  }
  setButton()
  {
    if (this.button != null) {
      
      if(this.playStatus == "play")
      {
        this.button.nativeElement.classList.add('bx-play');
        this.button.nativeElement.classList.remove('bx-pause');
      }
      else
      {
        
        this.button.nativeElement.classList.remove('bx-play');
        this.button.nativeElement.classList.add('bx-pause');
      }
    }
  }
  play() {
    if (this.button != null) {
      if(this.playStatus == "play")
      {
        
        this.songService.setCurrentSong(this.currentItem);
        this.playStatus = "pause";
      }
      else
      {
        this.playStatus = "play";
      }
      this.setButton();
      this.songService.setPlayStatus(this.playStatus);
      
    }
  }
  /*

  if (this.button.nativeElement.classList.contains('bx-play')) {
        this.button.nativeElement.classList.remove('bx-play');
        this.button.nativeElement.classList.add('bx-pause');
        this.songService.changePlayIcon('bx-pause');
        this.songService.setCurrentSong(this.currentItem);
      }
      else
      {
        this.button.nativeElement.classList.add('bx-play');
        this.button.nativeElement.classList.remove('bx-pause');
        this.songService.changePlayIcon('bx-play');
      }

  */
  navigateToDetails() {
    if (this.currentItem != undefined && this.currentItem != null) {
      this.router.navigate(['song', this.currentItem.id]);
    }
  }

}
