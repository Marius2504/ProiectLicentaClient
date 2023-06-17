import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class SongBarComponent implements OnInit,AfterViewInit {
  @ViewChild('playButton') playButton: ElementRef<HTMLElement> | undefined;

  @ViewChild('valCurrentTime') valCurrentTime: ElementRef<HTMLElement> | undefined;
  @ViewChild('volCurrentTime') volCurrentTime: ElementRef<HTMLElement> | undefined;
  @ViewChild('dotCurrentTime') dotCurrentTime: ElementRef<HTMLElement> | undefined;

  @ViewChild('valVolume') valVolume: ElementRef<HTMLElement> | undefined;
  @ViewChild('volVolume') volVolume: ElementRef<HTMLElement> | undefined;
  @ViewChild('dotVolume') dotVolume: ElementRef<HTMLElement> | undefined;
  artist: Artist | undefined
  minutes: number = 0;
  seconds: number = 0;
  isLogged: boolean = false;
  playStatus: string = 'play'
  audio = new Audio();
  progressBar: number = 0;
  volume: number = 100;
  songPlaying: Song = new Song();
  constructor(private songService: SongService, private artistService: ArtistService, private authService: AuthService) { }
  ngAfterViewInit(): void {
    this.getActualSong();
  }

  ngOnInit(): void 
  {   
    
  }
  getActualSong() {
    
    this.songService.currentSong.subscribe(Response => {
      this.songPlaying = Response; 
      this.getArtist();
      this.isReady();
    })
  }

  isReady()
  {
    this.songService.subscribe$.subscribe(resp=>{
      if(resp == true)
      {
        this.getAudio();
        this.getPlayStatus();
      }
    })
  }
  getAudio() {

      this.songService.audio$?.subscribe(resp => {

        this.audio = resp;
        //calculate time
        this.minutes = Math.floor(this.audio?.duration / 60);
        this.seconds = Math.floor(this.audio?.duration) - this.minutes * 60;

        //change volume based on audio recieved
        if (this.valVolume != undefined) {
          const inputElement = this.valVolume.nativeElement as HTMLInputElement;
          inputElement.value = (this.audio.volume * 100).toString();
          this.changeVolume();
        }

        //add listener to follow audio timeing
        this.audio.addEventListener('timeupdate', () => {
          
          if (this.valCurrentTime && this.volCurrentTime && this.dotCurrentTime) {

            var progressBar = (this.audio.currentTime / this.audio.duration) * 100
            const inputElement = this.valCurrentTime.nativeElement as HTMLInputElement;
            inputElement.value = progressBar.toString();

            
            this.volCurrentTime.nativeElement.style.width = progressBar + '%';
            
            this.dotCurrentTime.nativeElement.style.left = progressBar + '%';
          }
        })
      })
    
    
  }
  getArtist() {
    if (this.songPlaying != undefined) {
      this.artistService.Get(this.songPlaying.artistId).subscribe(response => {
        this.artist = response
      })
    }
  }
  getPlayStatus()
  {
    this.songService.playStatus$.subscribe( resp=>{
      this.playStatus = resp;
      this.setButton();
    })
  }
  setButton() {
    if (this.playButton != null) {

      if (this.playStatus == "play") {
        this.playButton.nativeElement.classList.add('bi-play-fill');
        this.playButton.nativeElement.classList.remove('bi-pause-fill');
      }
      else {

        this.playButton.nativeElement.classList.remove('bi-play-fill');
        this.playButton.nativeElement.classList.add('bi-pause-fill');
      }
    }
  }

  play() {
    if (this.playButton != null) {
      if (this.playStatus == "play") {
        this.songService.playSong()
      }
      else 
      {
        this.songService.stopSong();
      }
    }
  }
  changeCurrentTime() {
    if (this.valCurrentTime && this.volCurrentTime && this.dotCurrentTime) {
      const inputElement = this.valCurrentTime.nativeElement as HTMLInputElement;
      this.songService.changeCurrentTime((Number(inputElement.value) * this.audio.duration) / 100);
    }}
  changeVolume() {
    if (this.valVolume && this.volVolume && this.dotVolume) {
      const inputElement = this.valVolume.nativeElement as HTMLInputElement;
      this.songService.changeVolume(Number(inputElement.value) / 100);
      var volume = Number(inputElement.value);
      this.volVolume.nativeElement.style.width = volume + '%';
      this.dotVolume.nativeElement.style.left = volume + '%';
    }
  }
  getMinutes() {
    return Math.floor(this.audio.currentTime / 60).toString();
  }
  getSeconds() {
    if (this.audio.currentTime % 60 > 10)
      return (Math.floor(this.audio.currentTime % 60)).toString()
    return '0' + (Math.floor(this.audio.currentTime % 60)).toString()
  }

}
