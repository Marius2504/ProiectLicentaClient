import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../models/Song.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SongService extends GenericService<Song>{

  private currentSongSource=new BehaviorSubject<Song>(new Song());
  public currentSong=this.currentSongSource.asObservable();
  
  private audioSource =new BehaviorSubject<HTMLAudioElement>(new Audio);
  public audio$ : Observable<HTMLAudioElement> | undefined

  private playStatusSource = new BehaviorSubject<string>("play")
  public playStatus$ = this.playStatusSource.asObservable();

  private subscribeSource = new BehaviorSubject<boolean>(false)
  public subscribe$ = this.subscribeSource.asObservable();

  constructor(http:HttpClient) {
     super(http,'Song') 
     const songId = localStorage.getItem("currentSong");
      if(songId != null)
      {
        this.Get(parseInt(songId)).subscribe(resp =>{
          this.loadSong(resp); 
        })
      }
  }
  setCurrentSong(song:Song)
  {
    this.loadSong(song);
    this.storeSong(song.id);
  }

  loadSong(song:Song)
  {
    //functie care se ocupa de incarcarea corecta a melodiei
    this.currentSongSource.next(song);
    this.audio$ = undefined
    this.audioSource.value.src = this.currentSongSource.value.serverLink

    this.audioSource.value.onloadedmetadata = ()=>{
      this.audio$ = this.audioSource.asObservable()
      this.subscribeSource.next(true);
    }
  }
  storeSong(id:number)
  {
    if(localStorage.getItem("currentSong") !="")
      localStorage.removeItem("currentSong")

    localStorage.setItem("currentSong",id.toString())
  }
  isPaused():boolean
  {
    return this.audioSource.value.paused
  }

  playSong()
  {
    this.audioSource.value.play();
    this.playStatusSource.next("pause")
  }
  stopSong()
  {
    this.audioSource.value.pause();
    this.playStatusSource.next("play")
  }

  changeCurrentTime(value:number)
  {
    this.audioSource.value.currentTime = value;
  }
  changeVolume(value:number)
  {
    this.audioSource.value.volume = value;
  }
  getTrending(start:number,cantity:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.defaultUrl +this.url+ '/trending/' + start +'/'+ cantity)
  }

  getAllSongsOfAlbum(id:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.defaultUrl +this.url+ '/album/' + id)
  }

  getAllSongsOfArtist(id:number): Observable<Song[]> {
    return this.http.get<Song[]>(this.defaultUrl +this.url+ '/artist/' + id)
  }
  getSongWithIncludes(id:number): Observable<Song> {
    return this.http.get<Song>(this.defaultUrl +this.url+ '/includes/' + id)
  }
  addLike(song:Song,userId:string)
  {
    return this.http.post<Song>(this.defaultUrl +this.url+ '/addLike/' + userId + '/' + song.id,{})
  }
  removeLike(song:Song,userId:string)
  {
    return this.http.post<Song>(this.defaultUrl +this.url+ '/removeLike/' + userId + '/' + song.id,{})
  }
  

  UploadImage(formData:FormData)
  {
    return this.http.post(this.defaultUrl +'Upload/Song', formData, {reportProgress: true, observe: 'events'})
  }
  UploadSong(formData:FormData)
  {
    console.log("da")
    return this.http.post(this.defaultUrl +'Upload/songFile', formData, {reportProgress: true, observe: 'events'})
  }
  
  
}
