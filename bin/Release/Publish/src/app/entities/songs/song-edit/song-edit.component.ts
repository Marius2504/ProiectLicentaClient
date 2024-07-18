import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/app/enviroments/enviroments';
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
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {
  song: Song = new Song();
  artist = new Artist()
  albums: Album[] = []
  genres: Genre[] = []
  user:User = new User()
  id: number = 0;
  formData: FormData | undefined;
  formDataSong :FormData | undefined;
  constructor(private songService: SongService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router:Router,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private genreService: GenreService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.authService.getUser()
      .then(result => {
        this.user = result
        this.getSong();
      })
    })
  }
  getSong()
  {
    if (this.id != undefined && this.id != null) {
      this.songService.Get(this.id).subscribe(response => {
        this.song = response;
        this.getArtist();
        this.getGenres();
      },error =>{
        this.router.navigate(['/404'])
      })
    }
  }
  getArtist() {
    this.artistService.Get(this.song.artistId).subscribe(resp => {
      this.artist = resp;
      if(this.artist.appUserId!=this.user.id && this.authService.isAdmin()==false)
      {
        this.router.navigate(['/']);
      }
      this.getAlbums();
    })
  }
  getAlbums() {
    this.albumService.getAllAlbumsOfArtist(this.artist.id).subscribe(resp => {
      this.albums = resp;
    })
  }
  getGenres() {
    this.genreService.GetAll().subscribe(resp => {
      this.genres = resp;
    })
  }
  uploadFile = (files: any) => {
    console.log(files)
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.formData.append(this.song.id.toString(), 'id')
  }
  uploadFileSong = (files: any) => {
    console.log(files)
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    this.formDataSong = new FormData();
    this.formDataSong.append('file', fileToUpload, fileToUpload.name);
    this.formDataSong.append(this.song.id.toString(), 'id')
  }

  Update() {
    this.UploadImage();
  }

  UploadImage()
  {
    if (this.formData != undefined) {
      this.songService.UploadImage(this.formData)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.Response) {
              var response = { dbPath: '' };
              response = event.body
              this.song.imagePath = environment.apiUrl + response.dbPath;
              
              this.UploadSong();
            }
          },
          error : (event:any) => alert("Wrong format image! Accepted formats are: jpg, jpeg, png and gif")
          
        });
    }
    else
    {
      this.UploadSong();
    } 
  }
  UploadSong()
  {
    console.log(this.formDataSong);
    if (this.formDataSong != undefined) {
      this.songService.UploadSong(this.formDataSong)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.Response) {
              var response = { dbPath: '' };
              response = event.body

              this.song.serverLink = environment.apiUrl + response.dbPath;
              //Update song
              this.UpdateSong();
            }
          },
          error : (event:any) => alert("Wrong format song! Accepted formats are: .mp3, .wave")
        });
    }
    else{
      this.UpdateSong();
    } 
  }
  UpdateSong() {
    this.songService.Update(this.song).subscribe(Response => {
      console.log(Response);
      this.song = Response;
    })
  }

}

