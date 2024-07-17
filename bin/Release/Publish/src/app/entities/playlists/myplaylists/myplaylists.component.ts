import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist.model';
import { Song } from 'src/app/models/Song.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myplaylists',
  templateUrl: './myplaylists.component.html',
  styleUrls: ['./myplaylists.component.scss']
})
export class MyplaylistsComponent implements OnInit {
  songs:Song[] = []
  user:User = new User();

  constructor(private songService:SongService,
    private userService:UserService,
    private authService:AuthService){}
 
  ngOnInit(): void {
    this.getUser();
  }
  getUser()
  {
    this.authService.getUser().then((result:User|string) => {
      if(typeof(result) == "object")
      {
        this.user = result;
        this.songs = this.user.likedSongs;
      }
    })
  }
  
 
} 

