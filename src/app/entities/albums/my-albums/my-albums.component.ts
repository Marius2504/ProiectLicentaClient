import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { User } from 'src/app/models/User.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.scss']
})
export class MyAlbumsComponent implements OnInit {
  user: User = new User()
  artist: Artist = new Artist()
  albums: Album[] = []

  constructor(private authService: AuthService,
    private artistService: ArtistService,
    private albumService: AlbumService) { }

  ngOnInit(): void {
    this.authService.getUser().then(result => {
      this.user = result
      this.getArtist();
    })

  }
  getArtist() {
    this.artistService.getArtistOfUser(this.user.id).pipe(
      catchError(() => {
        this.getAllAlbums();
        this.artist.id = 3;
        return EMPTY;
      })
    )
      .subscribe({
        next: (resp) => {
          this.artist = resp;
          this.getAlbums();
        },
        error: (error) => {
        }
      })
  }
  getAllAlbums() {
    this.albumService.GetAll().subscribe(resp => {
      this.albums = resp;
      console.log(resp)
    })
  }
  getAlbums()
  {
    this.albumService.getAllAlbumsOfArtist(this.artist.id).subscribe(resp =>{
      this.albums = resp;
    })
  }
  deleteItem(id:number)
  {
    this.albumService.Delete(id).subscribe(resp =>{
      this.getAlbums();
      console.log(resp);
    })
  }
}
