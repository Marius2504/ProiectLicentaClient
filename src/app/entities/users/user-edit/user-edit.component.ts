import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'bin/Release/Publish/src/app/enviroments/enviroments';
import { catchError, EMPTY } from 'rxjs';
import { Artist } from 'src/app/models/Artist.model';
import { User } from 'src/app/models/User.model';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  defaultUrl: string = environment.apiUrl
  user: User = new User();
  artist = new Artist()
  id: string = "";
  progress: number = 0;
  message: string = "";
  formData: FormData | undefined;
  descriptionArtist = "";
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private artistService: ArtistService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //daca id-ul este undefined, se ia userul logat
      if (this.id != undefined && this.id != null) {
        this.userService.GetByStringId(this.id).subscribe(resp => {
          this.user = resp;
        },error =>{
          this.router.navigate(['/404'])
        })

      }
      else {
        this.authService.getUser().then(result => {
          this.user = result
          this.getArtist();
        })
          .catch(error => console.log(error));
      }

    })
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.formData.append(this.user.id, 'id')
  }

  Update() {
    if (this.formData != undefined) {
      this.userService.UploadImage(this.formData, this.user.id)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.Response) {
              var response = { dbPath: '' };
              response = event.body
              var urlLength = this.defaultUrl.length
              this.user.imagePath = this.defaultUrl.slice(0,urlLength-5) + '/'  + response.dbPath;
              console.log(this.user.imagePath)
              //Update artist
              this.UpdateArtist();
              //User
              this.UpdateUser();
            }
          },
          error : (event:any) => alert("Wrong format image! Accepted formats are: jpg, jpeg, png and gif")
        });
    }
    else {
      this.UpdateArtist();
      this.UpdateUser();
    }
  }
  getArtist() {
    this.artistService.getArtistOfUser(this.user.id).subscribe(resp => {
      this.artist = resp;
    }, error =>{
      console.log(error)
    });
  }

  UpdateArtist() {
    if (this.artist.id != 0) {
      this.artist.imagePath = this.user.imagePath;
      this.artist.name = this.user.name;
      this.artistService.Update(this.artist).subscribe();
    }
  }
  UpdateUser() {
    this.user.likedSongs = []
    this.user.messages = []
    this.userService.Update(this.user).subscribe(Response => {
      this.user = Response
    })
  }
}

