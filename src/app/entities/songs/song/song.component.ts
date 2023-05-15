import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/Song.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  @Input() currentItem:Song | undefined
}
