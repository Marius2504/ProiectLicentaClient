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
  genre:Genre = new Genre()
  name:string = ""
  formData:FormData = new FormData()

  constructor(private genreService:GenreService){}
  ngOnInit(): void {
    
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    //this.formData.append(this.user.id,'id')
  }
  save()
  {
    console.log(this.genre.name)
    this.genreService.Add(this.genre).subscribe(resp =>{
      this.genre = resp;
      this.formData.append(this.genre.id.toString(),'id')
      this.genreService.UploadImage(this.formData,this.genre.id)
      .subscribe({
        next: (event:any) => {
          if (event.type === HttpEventType.Response) {
            var response = {dbPath: ''};
            response = event.body
            this.genre.imagePath ="https://localhost:7255/" + response.dbPath;
            
            //Update genre
            this.genreService.Update(this.genre).subscribe(Response => {
              this.genre = Response
            })
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    })
      
    
  }

}
