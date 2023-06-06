import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
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
  @Input() currentItem: Song = new Song()
  @ViewChild('buttonId') button: ElementRef<HTMLElement> | undefined;
  @ViewChild('image') image: ElementRef<HTMLElement> | undefined;
  playStatusSubscription : Subscription | undefined
  artist:Artist = new Artist()
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
        this.playStatusSubscription = this.songService.playStatus.subscribe( resp =>{
          if(Response.id == this.currentItem.id){
            this.playStatus = resp;
            this.setButton();
          }
        })
      }
      else if(this.playStatus == "pause" && this.button != null)
      {
        this.button.nativeElement.classList.add('bx-play');
        this.button.nativeElement.classList.remove('bx-pause');
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
        this.songService.playSong(this.currentItem.serverLink)
        //"../../../../assets/Shouse-Won-t-Forget-You.mp3"
        this.playStatus = "pause";
      }
      else
      {
        this.songService.stopSong();
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
