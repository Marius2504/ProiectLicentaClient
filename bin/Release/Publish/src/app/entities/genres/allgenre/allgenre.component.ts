import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-allgenre',
  templateUrl: './allgenre.component.html',
  styleUrls: ['./allgenre.component.scss']
})
export class AllgenreComponent implements OnInit{
  genres:Genre[]=[]
  constructor(private genreService:GenreService){}
  
  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){ 
    this.genreService.GetAll().subscribe(resp=>{
      this.genres = resp;
    })
  }
}
