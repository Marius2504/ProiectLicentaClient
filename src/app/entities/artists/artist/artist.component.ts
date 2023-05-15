import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/Artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
@Input() currentItem:Artist | undefined
}
