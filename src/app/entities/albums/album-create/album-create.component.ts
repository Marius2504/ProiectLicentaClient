import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'bin/Release/Publish/src/app/enviroments/enviroments';
import { catchError, EMPTY } from 'rxjs';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { User } from 'src/app/models/User.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.scss']
})
export class AlbumCreateComponent implements OnInit {
  defaultUrl: string = environment.apiUrl
  album: Album = new Album()
  formAlbumImage: FormData | undefined
  user: User = new User();
  artist: Artist = new Artist()
  
  constructor(private albumService: AlbumService, 
    private authService: AuthService, 
    private artistService:ArtistService) { }

  ngOnInit(): void {
    this.authService.getUser()
      .then(resp => {
        this.user = resp;
        this.getArtist();
      })
  }
  getArtist() {
    this.artistService.getArtistOfUser(this.user.id).pipe(
      catchError(() => {
        this.artist.id = 3;
        return EMPTY;
      })
    )
      .subscribe({
        next: (resp) => {
          this.artist = resp;
        },
        error: (error) => {
        }
      })
  }

  uploadAlbumImage = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formAlbumImage = new FormData();
    this.formAlbumImage.append('file', fileToUpload, fileToUpload.name);
  }
  save() {
    this.album.artistId = this.artist.id;
    this.albumService.Add(this.album).subscribe(resp => {
      this.album =resp;
      console.log(this.album);
      this.UpdateWithImage();
      alert("album added")
    },error=>{
      alert("album was not added");
    })

  }
  UpdateWithImage() {

    if (this.formAlbumImage != undefined) {
      this.formAlbumImage.append(this.album.id.toString(), 'id')
      this.albumService.UploadImage(this.formAlbumImage).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            var response = { dbPath: '' };
            response = event.body
            this.album.imagePath = this.defaultUrl + response.dbPath;

            //Update album
            this.albumService.Update(this.album).subscribe(Response => {
              this.album = Response
            })
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    }
  }
}
