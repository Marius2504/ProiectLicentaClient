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
  songPlaying: Song = new Song();
  @ViewChild('buttonId') button: ElementRef<HTMLElement> | undefined;
  @ViewChild('image') image: ElementRef<HTMLElement> | undefined;
  artist: Artist = new Artist()
  playStatus: string = "play";
  constructor(private router: Router, private songService: SongService, private artistService: ArtistService) { }
  ngAfterViewInit(): void {
    this.getActualSong();
    this.getArtist();
  }

  ngOnInit(): void { 
  }
  getActualSong() {
    this.songService.currentSong.subscribe(Response => {
      this.songPlaying = Response;
      this.getPlayStatus();
    })
  }
  getPlayStatus() {
    this.songService.playStatus$.subscribe(resp => {
      if (this.songPlaying.id == this.currentItem.id) {
        this.playStatus = resp;
        this.setButton();
      }
      else if (this.playStatus == "pause") {
        this.playStatus = "play";
        this.setButton();
      }
    })
  }
  setButton() {
    if (this.button != null) {

      if (this.playStatus == "play") {
        this.button.nativeElement.classList.add('bx-play');
        this.button.nativeElement.classList.remove('bx-pause');
      }
      else {
        this.button.nativeElement.classList.remove('bx-play');
        this.button.nativeElement.classList.add('bx-pause');
      }
    }
  }
  play() {
    if (this.button != null) {
      if (this.playStatus == "play") {
        if (this.currentItem.id != this.songPlaying.id) {
          this.songService.setCurrentSong(this.currentItem);
          this.songService.playSong();
        }
        else {
          this.songService.playSong();
        }
      }
      else {
        this.songService.stopSong();
      }
    }
  }
  getArtist() {
    if (this.currentItem != undefined) {
      this.artistService.Get(this.currentItem.artistId).subscribe(response => {
        this.artist = response
      })
    }
  }

  navigateToDetails() {
    if (this.currentItem != undefined && this.currentItem != null) {
      this.router.navigate(['song', this.currentItem.id]);
    }
  }

}
