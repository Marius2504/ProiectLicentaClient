import { Component, Input } from '@angular/core';
import { Album } from 'src/app/models/Album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  @Input() currentItem:Album | undefined
}
