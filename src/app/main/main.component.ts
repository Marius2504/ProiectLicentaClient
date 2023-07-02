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
  slideCountSongs = 0;
  slideCountAlbums = 0;
  slideCountArtists = 0;

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

  slideSongsLeft(): void {
    this.slideCountSongs++;
    this.slide("song",this.slideCountSongs)
  }
  slideSongsRight(): void {
    this.slideCountSongs--;
    this.slide("song",this.slideCountSongs)
  }

  slideAlbumsLeft(): void {
    this.slideCountAlbums++;
    this.slide("album",this.slideCountAlbums)
  }
  slideAlbumsRight(): void {
    this.slideCountAlbums--;
    this.slide("album",this.slideCountAlbums)
  }
  slideArtistsLeft(): void {
    this.slideCountArtists++;
    this.slide("artist",this.slideCountArtists)
  }
  slideArtistsRight(): void {
    this.slideCountArtists--;
    this.slide("artist",this.slideCountArtists)
  }

  slide(element:string,slideCount:number)
  {
    const elements = document.querySelectorAll('.'+element) as NodeListOf<HTMLElement>;
    const translateX = -100 * slideCount;

    elements.forEach((element) => {
      element.style.transform = `translateX(${translateX}%)`;
    });
  }

}
