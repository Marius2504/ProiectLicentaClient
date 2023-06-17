import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/Song.model';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  songs:Song[] = []

  constructor(private songService:SongService){}

  ngOnInit(): void {
    this.getSongs();
  }
  getSongs()
  {
    this.songService.getTrending(0,10).subscribe(resp=>{
      this.songs = resp;
      console.log(resp)
    })
  }

}
