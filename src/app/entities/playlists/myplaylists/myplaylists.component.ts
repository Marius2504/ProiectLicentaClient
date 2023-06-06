import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist.model';
import { Song } from 'src/app/models/Song.model';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-myplaylists',
  templateUrl: './myplaylists.component.html',
  styleUrls: ['./myplaylists.component.scss']
})
export class MyplaylistsComponent implements OnInit {

  playlists:Playlist[] = []
  

  constructor(private playlistService:PlaylistService){}
 
  ngOnInit(): void {}
  
  getSongs()
  {
    this.playlistService.GetAll().subscribe(response =>{
      this.playlists = response;
    })
  }


} {

}
