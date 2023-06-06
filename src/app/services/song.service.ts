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

  
  private audioSource =new BehaviorSubject<HTMLAudioElement>(new Audio);
  public audio$ = this.audioSource.asObservable();
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
      
      this.audioSource.value.src = this.currentSongSource.value.serverLink
  
      this.audioSource.value.onloadedmetadata = ()=>{
        this.audioSource.next(this.audioSource.value);
      }
      
      this.currentSong = this.currentSongSource.asObservable();
    })
  }
  getAllSongsOfAlbum(id:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.url+ '/album/' + id)
  }

  getAllSongsOfArtist(id:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.url+ '/artist/' + id)
  }
  getSongWithIncludes(id:number): Observable<Song> {
    return this.http.get<Song>(this.url+ '/includes/' + id)
  }

  
  setCurrentSong(song:Song)
  {
    this.currentSongSource.next(song);
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

  playSong(source:string)
  {
    
    if(this.audioSource.value.src != source.replaceAll("\\","/"))
    {
      this.audioSource.value.src = source
      this.audioSource.value.onloadedmetadata = ()=>{
        this.audioSource.next(this.audioSource.value);
      }
    }
    this.audioSource.value.play();
   // this.audio.play();
  }
  stopSong()
  {
    this.audioSource.value.pause();
  }
  addLike(song:Song,userId:string)
  {
    return this.http.post<Song>(this.url+ '/addLike/' + userId + '/' + song.id,{})
  }
  removeLike(song:Song,userId:string)
  {
    return this.http.post<Song>(this.url+ '/removeLike/' + userId + '/' + song.id,{})
  }
  changeCurrentTime(value:number)
  {
    this.audioSource.value.currentTime = value;
  }
  changeVolume(value:number)
  {
    
    this.audioSource.value.volume = value;
  }

  UploadImage(formData:FormData)
  {
    return this.http.post("https://localhost:7255/api" +'/Upload/Song', formData, {reportProgress: true, observe: 'events'})
  }
  UploadSong(formData:FormData)
  {
    return this.http.post("https://localhost:7255/api" +'/Upload/songFile', formData, {reportProgress: true, observe: 'events'})
  }
  
  
}
