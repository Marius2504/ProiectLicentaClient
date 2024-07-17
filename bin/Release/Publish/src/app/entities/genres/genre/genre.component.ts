import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
@Input() genre = new Genre()
show:boolean = true;

constructor(private genreService:GenreService){}
  ngOnInit(): void {}

  deleteItem()
  {
    if (confirm("Are you sure you want to delete this item?")) {
    this.genreService.Delete(this.genre.id).subscribe();
    this.show = false;
    }
  }
}
