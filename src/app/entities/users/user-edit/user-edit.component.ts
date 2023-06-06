import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
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
  user: User = new User("", "", "", false, "", "");
  id: string = "";
  progress: number = 0;
  message: string = "";
  formData: FormData | undefined;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private artistService:ArtistService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      //daca id-ul este undefined, se ia userul logat
      if (this.id != undefined && this.id != null) {
        this.userService.GetByStringId(this.id).subscribe(resp => {
          this.user = resp;
          
        })
      }
      else {
        this.authService.getUser().then(result => {
          this.user = result
          console.log(this.user)
        })
          .catch(error => console.log(error));

      }

    }

    )

  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.formData.append(this.user.id,'id')
  }

  Update() {
    if (this.formData != undefined) 
    {
      this.userService.UploadImage(this.formData,this.user.id)
        .subscribe({
          next: (event:any) => {
            if (event.type === HttpEventType.UploadProgress && event.total != undefined) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              var response = {dbPath: ''};
              response = event.body
              this.user.imagePath ="https://localhost:7255/" + response.dbPath;
              
              //Update artist
              this.artistService.getArtistOfUser(this.user.id).pipe(
                catchError(() => {
                  return EMPTY;
                })
              )
                .subscribe({
                  next: (resp) => {
                    resp.imagePath = this.user.imagePath;
                    console.log(resp);
                    this.artistService.Update(resp).subscribe();
                  },
                  error: (error) => {
                  }
                })
              //User
              this.user.likedSongs = []
              this.user.messages = []
              this.userService.Update(this.user).subscribe(Response => {
                this.user = Response
              })
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    }

    else
    {
      this.userService.Update(this.user).subscribe(Response => {
        this.user = Response
      })
    }
  }
}
