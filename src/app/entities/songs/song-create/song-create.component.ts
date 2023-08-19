import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Genre } from 'src/app/models/Genre.model';
import { Song } from 'src/app/models/Song.model';
import { User } from 'src/app/models/User.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';
import { GenreService } from 'src/app/services/genre.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.scss']
})
export class SongCreateComponent implements OnInit {
  song: Song = new Song()
  genres: Genre[] = [];
  albums: Album[] = [];
  album: Album = new Album()
  user: User = new User();
  iddd: number = 0;
  artist: Artist = new Artist()
  selectedGenre = "";
  selectedAlbum = "Single";
  formSongImage: FormData | undefined
  formSong: FormData | undefined
  formAlbumImage: FormData | undefined

  constructor(private genreService: GenreService,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private authService: AuthService,
    private songService: SongService) { }
  ngOnInit(): void {
    this.authService.getUser()
      .then(resp => {
        this.user = resp;
        this.getArtist();
        this.getGenres();
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
          this.song.artistId = this.artist.id;
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
  getAlbums() {
    this.albumService.getAllAlbumsOfArtist(this.artist.id).subscribe(resp => {
      this.albums = resp;
    }, error => {
      console.log(error)
    })
  }
  getGenres() {
    this.genreService.GetAll().subscribe(resp => {
      this.genres = resp;
    })
  }
  uploadSongImage = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formSongImage = new FormData();
    this.formSongImage.append('file', fileToUpload, fileToUpload.name);
  }

  uploadSong = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formSong = new FormData();
    this.formSong.append('file', fileToUpload, fileToUpload.name);
  }

  uploadAlbumImage = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formSongImage = new FormData();
    this.formSongImage.append('file', fileToUpload, fileToUpload.name);

  }
  save() {
    if (this.selectedAlbum == "Single") {
      //cream un album nou
      var alb = new Album()
      alb.description = "No description";
      alb.name = this.song.name;
      alb.year = new Date().getFullYear()
      alb.artistId = this.artist.id;
      this.albumService.Add(alb).subscribe(resp => {
        ///
        this.album = resp;
        this.song.albumId = resp.id;
        ///
        this.saveSong()
      })
    }
    else {
      this.albumService.GetByName(this.selectedAlbum).subscribe(resp => {
        ///
        this.album = resp;
        this.song.albumId = resp.id
        this.saveSong()
        ///
      })
    }

  }
  saveSong() {
    this.song.genreId = parseInt(this.selectedGenre);
    this.addSong();
  }

  addSong() {
    this.song.messages = []
    this.song.artistId = this.artist.id;
    this.songService.Add(this.song).subscribe(resp => {
      this.song = resp;
      this.song.messages = []
      this.addSongImage();
      this.addSongFile();
      alert("song added")
      
    }, error=>{
      alert("song was not added- error")
    })
  }

  addSongImage() {
    if (this.formSongImage != undefined) {
      this.formSongImage.append(this.song.id.toString(), 'id')
      this.songService.UploadImage(this.formSongImage).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            var response = { dbPath: '' };
            response = event.body
            this.song.imagePath = "https://localhost:7255/" + response.dbPath;

            //Update song
            this.songService.Update(this.song).subscribe(Response => {
              this.song = Response
            })

            if (this.selectedAlbum == "Single") {
              this.addAlbumImage();
            }
          }
        },
        error: (err: HttpErrorResponse) => alert("Wrong format image! Accepted formats are: jpg, jpeg, png and gif")
      });
    }
  }
  addAlbumImage() {
    if (this.formSongImage != undefined) {
      this.formSongImage.delete(this.song.id.toString());
      this.formSongImage.append(this.album.id.toString(), 'id')
      this.albumService.UploadImage(this.formSongImage).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            var response = { dbPath: '' };
            response = event.body
            this.album.imagePath = "https://localhost:7255/" + response.dbPath;

            //Update album
            this.albumService.Update(this.album).subscribe(Response => {
              console.log(Response);
              this.album = Response
            })
          }
        },
        error: (err: HttpErrorResponse) => alert("Wrong format image! Accepted formats are: jpg, jpeg, png and gif")
      });
    }
  }
  addSongFile()
  {
    if(this.formSong !=null)
    {
        this.formSong.append(this.song.id.toString(), 'id')
        this.songService.UploadSong(this.formSong).subscribe({
          next: (event:any) => {
            if (event.type === HttpEventType.Response) {
              var response = {dbPath: ''};
              response = event.body
              this.song.serverLink ="https://localhost:7255/" + response.dbPath;
              
              //Update genre
              this.songService.Update(this.song).subscribe(Response => {
                console.log(Response);
                this.song = Response
              })
            }
          },
          error : (event:any) => alert("Wrong format song! Accepted formats are: .mp3, .wave")
        });
    }
    
  }
  

}



