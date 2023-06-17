import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Genre } from 'src/app/models/Genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.scss']
})
export class GenreEditComponent {
  genre:Genre = new Genre()
  id: number = 0;
  formData: FormData | undefined;
  constructor(private genreService:GenreService,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.genreService.Get(this.id).subscribe(response => {
          this.genre = response;
        })
      }
    })
  }
  Update() {
    this.UploadImage();
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.formData.append(this.genre.id.toString(), 'id')
  }

  UploadImage()
  {
    if (this.formData != undefined) {
      this.genreService.UploadImage(this.formData)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.Response) {
              var response = { dbPath: '' };
              response = event.body
              this.genre.imagePath = "https://localhost:7255/" + response.dbPath;
              
              this.UpdateGenre();
            }
          }
        });
    }
    else
    {
      this.UpdateGenre();
    } 
  }
  UpdateGenre()
  {
    this.genreService.Update(this.genre).subscribe(resp=>{
      this.genre = resp;
    })
  }
}
