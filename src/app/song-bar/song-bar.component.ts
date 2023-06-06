import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../models/Artist.model';
import { Song } from '../models/Song.model';
import { ArtistService } from '../services/artist.service';
import { AuthService } from '../services/auth.service';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-song-bar',
  templateUrl: './song-bar.component.html',
  styleUrls: ['./song-bar.component.scss']
})
export class SongBarComponent implements OnInit {
  @ViewChild('playButton') playButton: ElementRef<HTMLElement> | undefined;

  @ViewChild('valCurrentTime') valCurrentTime: ElementRef<HTMLElement> | undefined;
  @ViewChild('volCurrentTime') volCurrentTime: ElementRef<HTMLElement> | undefined;
  @ViewChild('dotCurrentTime') dotCurrentTime: ElementRef<HTMLElement> | undefined;

  @ViewChild('valVolume') valVolume: ElementRef<HTMLElement> | undefined;
  @ViewChild('volVolume') volVolume: ElementRef<HTMLElement> | undefined;
  @ViewChild('dotVolume') dotVolume: ElementRef<HTMLElement> | undefined;
  song: Song | undefined
  artist: Artist | undefined
  minutes: number = 0;
  seconds: number = 0;
  isLogged:boolean = false;
  playStatus:string = 'play'
  audio = new Audio();
  progressBar:number = 0;
  volume:number=100;
  constructor(private songService: SongService, private artistService: ArtistService,private authService:AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(Response =>{
      this.isLogged = Response;
      if(this.isLogged)
      {
        this.songService.currentSong.subscribe(Response => {
          this.song = Response;
          this.artistService.Get(this.song?.artistId).subscribe(response => {
            this.artist = response;
          });

          this.songService.audio$.subscribe(resp =>
            {
              this.audio = resp;
              this.minutes = Math.floor(this.audio?.duration/60);
              this.seconds = Math.floor(this.audio?.duration) - this.minutes*60;  
              
              if(this.valVolume!=undefined){
                const inputElement = this.valVolume.nativeElement as HTMLInputElement;
                inputElement.value = (this.audio.volume * 100).toString();
                this.changeVolume();
              }
              this.audio.addEventListener('timeupdate',()=>{
                if (this.valCurrentTime && this.volCurrentTime &&this.dotCurrentTime) {

                  var progressBar = (this.audio.currentTime/this.audio.duration)*100
                  const inputElement = this.valCurrentTime.nativeElement as HTMLInputElement;
                  inputElement.value = progressBar.toString();
                  
                  this.volCurrentTime.nativeElement.style.width = progressBar + '%';
                  this.dotCurrentTime.nativeElement.style.left = progressBar + '%';
                }
                
              })
            })

          this.songService.playStatus.subscribe(Response => {
            this.playStatus = Response;
            if (this.playButton?.nativeElement.classList.contains('bi-play-fill')) {
              this.playButton?.nativeElement.classList.remove('bi-play-fill');
            }
            if (this.playButton?.nativeElement.classList.contains('bi-pause-fill')) {
              this.playButton?.nativeElement.classList.remove('bi-pause-fill');
            }
            if (Response == 'pause') {
              this.playButton?.nativeElement.classList.add('bi-pause-fill');
            }
            else {
              this.playButton?.nativeElement.classList.add('bi-play-fill');
            }
          })
        })
      } 

      
    }) 
  }

  play()
  {
    if (this.playButton != null) {
      if(this.playStatus == "play")
      {
        if(this.song != undefined)
        {
          this.songService.playSong(this.song.serverLink)
        }
        this.songService.setPlayStatus("pause");
      }
      else
      {
        this.songService.stopSong();
        this.songService.setPlayStatus("play");
      }
    }
  }
  changeCurrentTime()
  {
    if (this.valCurrentTime && this.volCurrentTime &&this.dotCurrentTime) 
    {
      const inputElement = this.valCurrentTime.nativeElement as HTMLInputElement;
      this.songService.changeCurrentTime((Number(inputElement.value)*this.audio.duration)/100);
    }

  }
  changeVolume()
  {
    if (this.valVolume && this.volVolume &&this.dotVolume) 
    {
      const inputElement = this.valVolume.nativeElement as HTMLInputElement;
      this.songService.changeVolume(Number(inputElement.value)/100);
      var volume = Number(inputElement.value);
      this.volVolume.nativeElement.style.width = volume + '%';
      this.dotVolume.nativeElement.style.left = volume + '%';
    }
  }
  getMinutes()
  {
    return Math.floor(this.audio.currentTime /60).toString();
  }
  getSeconds()
  {
    if(this.audio.currentTime %60 >10)
      return (Math.floor(this.audio.currentTime %60)).toString()
    return '0'+ (Math.floor(this.audio.currentTime %60)).toString()
  }

  
}
