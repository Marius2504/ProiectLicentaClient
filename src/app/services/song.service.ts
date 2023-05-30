import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../models/Song.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SongService extends GenericService<Song>{
  private currentSongSource=new BehaviorSubject<Song>(new Song("",0,"","",0,0,0,0));
  public currentSong =this.currentSongSource.asObservable(); 

  private playStatusSource = new BehaviorSubject<string>('play');
  public playStatus = this.playStatusSource?.asObservable();

  constructor(http:HttpClient) {
     super(http,'https://localhost:7255/api/Song') 
     const songId = localStorage.getItem("currentSong");
      if(songId != null)
      {
        this.getSong(Number(songId));
      }
    }
  private getSong(id:number)
  {
    this.Get(id).subscribe(resp =>{
      this.currentSongSource.next(resp);
      
      this.currentSong = this.currentSongSource.asObservable();
    })
    
  }
  
  getAllSongsOfAlbum(id:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.url+ '/album/' + id)
  }

  getAllSongsOfArtist(id:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.url+ '/artist/' + id)
  }
  
  setCurrentSong(song:Song)
  {
    if(this.currentSongSource !=undefined){
      this.currentSongSource.next(song);
     // console.log(this.currentSong);
    }
    else{
      //this.currentSongSource = new BehaviorSubject<Song>(song);
     // this.currentSong = this.currentSongSource.asObservable();
    }
    this.storeSong(song.id)
  }
  setPlayStatus(status:string)
  {
    if(status == "play")
    {
      
      this.playStatusSource.next("play");
    }
    else
    {
      
      this.playStatusSource.next("pause");
    }
    
  }

  changePlayIcon(textClass:string)
  {
    this.playStatusSource.next(textClass);
  }

  storeSong(id:number)
  {
    if(localStorage.getItem("currentSong") !="")
      localStorage.removeItem("currentSong")

    localStorage.setItem("currentSong",id.toString())
  }
  

}
