import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/models/Artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
@Input() currentItem:Artist =  new Artist(0,"","","",[],[],[])

constructor(private router:Router){ }
  ngOnInit(): void {
    
  }
navigateToDetails() {
   
  if (this.currentItem != undefined && this.currentItem != null) {
    this.router.navigate(['artist', this.currentItem.id]);
  }
}
}
