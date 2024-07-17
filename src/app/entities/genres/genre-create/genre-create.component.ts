import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.scss']
})
export class GenreCreateComponent implements OnInit{
  defaultUrl: string = "http://dumitrescu.online/api/"
  genre:Genre = new Genre()
  name:string = ""
  formData:FormData = new FormData()

  constructor(private genreService:GenreService){}
  ngOnInit(): void {
   // this.genre.id = 9;
  //  this.genre.name = "Country"
  //  this.genre.imagePath = "https://localhost:7255/Resources\\Images\\genre\\9.avif"
   // this.UpdateGenre();
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
  }
  save()
  {
    this.genreService.Add(this.genre).subscribe(resp =>{
      this.genre = resp;
      this.formData.append(this.genre.id.toString(),'id')
      this.genreService.UploadImage(this.formData)
      .subscribe({
        next: (event:any) => {
          if (event.type === HttpEventType.Response) {
            
            var response = {dbPath: ''};
            console.log(event.body)
            response = event.body
            this.genre.imagePath =this.defaultUrl + response.dbPath;
            
            //Update genre
            this.UpdateGenre();
          }
        },
        error : (event:any) => alert("Wrong format image! Accepted formats are: jpg, jpeg, png and gif")
      });
    })
  }
  UpdateGenre()
  {
    this.genreService.Update(this.genre).subscribe(Response => {
      this.genre = Response
    })
  }

}
