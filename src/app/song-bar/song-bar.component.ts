import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../models/Artist.model';
import { Song } from '../models/Song.model';
import { ArtistService } from '../services/artist.service';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-song-bar',
  templateUrl: './song-bar.component.html',
  styleUrls: ['./song-bar.component.scss']
})
export class SongBarComponent implements OnInit {
  @ViewChild('playButton') playButton: ElementRef<HTMLElement> | undefined;
  song: Song | undefined
  artist: Artist | undefined
  minutes: number = 0;
  seconds: number = 0;


  constructor(private songService: SongService, private artistService: ArtistService) {
    
  }

  ngOnInit(): void {
    this.songService.currentSong.subscribe(Response => {
      this.song = Response;
    })
    if (this.song != undefined) {
      this.artistService.Get(this.song?.artistId).subscribe(response => {
        this.artist = response;
      });

      this.songService.playStatus.subscribe(Response => {
        if (this.playButton?.nativeElement.classList.contains('bi-play-fill')) {
          this.playButton?.nativeElement.classList.remove('bi-play-fill');
        }
        if (this.playButton?.nativeElement.classList.contains('bi-pause-fill')) {
          this.playButton?.nativeElement.classList.remove('bi-pause-fill');
        }
        if(Response == 'pause'){
        this.playButton?.nativeElement.classList.add('bi-pause-fill');
        }
        else
        {
          this.playButton?.nativeElement.classList.add('bi-play-fill');
        }
      })
    }
   }
}
