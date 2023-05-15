import { Component, OnInit } from '@angular/core';
import { Album } from '../models/Album.model';
import { Artist } from '../models/Artist.model';
import { Song } from '../models/Song.model';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { SongService } from '../services/song.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AlbumService]
})
export class MainComponent implements OnInit {
  albums: Album[] = []
  artists: Artist[] = []
  songs: Song[] = []


  constructor(private albumService: AlbumService,
    private artistService: ArtistService,
    private songService: SongService,
  ) {

  }
  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.albumService.GetAll().subscribe((response: Album[]) => {
      this.albums = response
    },error =>{
      console.log(error)
    });
    this.artistService.GetAll().subscribe((response: Artist[]) => {
      this.artists = response
    },error =>{
      console.log(error)
    });
    this.songService.GetAll().subscribe((response: Song[]) => {
      this.songs = response
    },error =>{
      console.log(error)
    });

  }


}
