import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Song } from 'src/app/models/Song.model';
import { Event } from 'src/app/models/Event.model';
import { Location } from 'src/app/models/Location.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { EventService } from 'src/app/services/event.service';
import { SongService } from 'src/app/services/song.service';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  artist: Artist = new Artist()
  songs: Song[] = []
  albums: Album[] = []
  events: Event[] = []
  locations: Location[] = []
  id: number = 0
  adminOrArtist: boolean = false;
  user: User = new User();
  slideCountSongs = 0;
  slideCountAlbums = 0;
  constructor(private route: ActivatedRoute,
    private songService: SongService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private eventService: EventService,
    private locationService: LocationService,
    private authService: AuthService,
    private router:Router
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (this.id != undefined && this.id != 0) {
        this.getArtist()
      }
    })
  }
  getArtist() {
    this.artistService.Get(this.id).subscribe(response => {
      this.artist = response;
      this.getUser();
      this.getSongs();
      this.getAlbums();
      this.getEvents();
    },error =>{
      this.router.navigate(['/404'])
    })
  }
  getSongs() {
    this.songService.getAllSongsOfArtist(this.id).subscribe(response => {
      this.songs = response;
    })
  }
  getAlbums() {
    this.albumService.getAllAlbumsOfArtist(this.id).subscribe(response => {
      this.albums = response;
    })
  }
  getEvents() {
    this.eventService.getAllEventsOfArtist(this.id).subscribe(response => {
      this.events = response;
      this.getLocations();
    })
  }
  getLocations() {
    this.events.forEach(event => {
      this.locationService.Get(event.locationId).subscribe(resp => {
        this.locations.push(resp)
      })
    });
  }
  getUser() {
    this.authService.getUser().then(result => {
      this.user = result
      this.adminOrArtist = this.authService.isAdmin()
     // this.adminOrArtist = this.authService.isAdmin() || this.artist.appUserId == this.user.id;
    })
      .catch(error => console.log(error));
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

  slide(element:string,slideCount:number)
  {
    const elements = document.querySelectorAll('.'+element) as NodeListOf<HTMLElement>;
    const translateX = -100 * slideCount;

    elements.forEach((element) => {
      element.style.transform = `translateX(${translateX}%)`;
    });
  }


}
