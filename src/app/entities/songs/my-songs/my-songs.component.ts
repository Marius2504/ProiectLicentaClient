import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Artist } from 'src/app/models/Artist.model';
import { Song } from 'src/app/models/Song.model';
import { User } from 'src/app/models/User.model';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.scss']
})
export class MySongsComponent implements OnInit{
  user:User =new User()
  artist:Artist=new Artist()
  songs:Song[] = []
  constructor(private authService:AuthService,
    private artistService:ArtistService,
    private songService:SongService){}

  ngOnInit(): void {
    this.authService.getUser().then(result => {
      this.user = result
      this.getArtist();
    })
      .catch(error => console.log(error));
  }
  getArtist() {
    this.artistService.getArtistOfUser(this.user.id).pipe(
      catchError(() => {
        this.getAllSongs();
        this.artist.id = 3;
        return EMPTY;
      })
    )
      .subscribe({
        next: (resp) => {
          this.artist = resp;
          this.getSongs();
        },
        error: (error) => {
        }
      })
  }
  getAllSongs() {
    this.songService.GetAll().subscribe(resp => {
      this.songs = resp;
      console.log(resp)
    })
  }
  getSongs()
  {
    this.songService.getAllSongsOfArtist(this.artist.id).subscribe(resp =>{
      this.songs = resp;
    })
  }
  deleteItem(id:number)
  {
    this.songService.Delete(id).subscribe(resp =>{
      this.getSongs();
      console.log(resp);
    })
  }
  

}
