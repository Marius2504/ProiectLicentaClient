import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Song } from 'src/app/models/Song.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.scss']
})
export class AlbumEditComponent implements OnInit {
  defaultUrl: string = "http://dumitrescu.online/api/"
  album: Album = new Album()
  songs: Song[] = []
  id: number = 0;
  slideCountSongs = 0;
  formData: FormData | undefined;

  constructor(private albumService: AlbumService,
    private route: ActivatedRoute,
    private songService: SongService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.albumService.Get(this.id).subscribe(response => {
          this.album = response;
          this.getSongs();
        }, error => {
          this.router.navigate(['../404'])
        })
      }
    })
  }
  getSongs() {
    this.songService.getAllSongsOfAlbum(this.album.id).subscribe(resp => {
      this.songs = resp;
    })
  }
  slideSongsLeft(): void {
    this.slideCountSongs++;
    this.slide("song", this.slideCountSongs)
  }
  slideSongsRight(): void {
    this.slideCountSongs--;
    this.slide("song", this.slideCountSongs)
  }
  slide(element: string, slideCount: number) {
    const elements = document.querySelectorAll('.' + element) as NodeListOf<HTMLElement>;
    const translateX = -100 * slideCount;

    elements.forEach((element) => {
      element.style.transform = `translateX(${translateX}%)`;
    });
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.formData.append(this.album.id.toString(), 'id')
  }
  deleteItem(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.songService.Delete(id).subscribe(resp => {
      })
    }
  }
  Update() {
    this.UploadImage();
  }

  UploadImage() {
    if (this.formData != undefined) {
      this.albumService.UploadImage(this.formData)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.Response) {
              var response = { dbPath: '' };
              response = event.body
              this.album.imagePath = this.defaultUrl + response.dbPath;

              this.UpdateAlbum();
            }
          },
          error : (event:any) => alert("Wrong format image! Accepted formats are: jpg, jpeg, png and gif")
        });
    }
    else {
      this.UpdateAlbum();
    }
  }
  UpdateAlbum() {
    this.albumService.Update(this.album).subscribe(resp => {
      this.album = resp;
    })
  }
}
