import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Album } from 'src/app/models/Album.model';
import { Artist } from 'src/app/models/Artist.model';
import { Genre } from 'src/app/models/Genre.model';
import { Message } from 'src/app/models/Message.model';
import { Song } from 'src/app/models/Song.model';
import { User } from 'src/app/models/User.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';
import { GenreService } from 'src/app/services/genre.service';
import { MessageService } from 'src/app/services/message.service';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {
  @ViewChild('like') icon: ElementRef<HTMLElement> | undefined;
  @ViewChild('likeMessage') likeMessage: ElementRef<HTMLElement> | undefined;
  currentSong:Song = new Song()
  artist:Artist = new Artist()
  album:Album = new Album(0,"","","",0,0)
  genre:Genre = new Genre(0,"")
  id:number = 0
  userId:string =""
  user:User = new User();
  messageSend:Message = new Message();
  messages:Message[] = [];
  messageUsers:User[]=[]
  like:boolean = false;

  constructor(private route:ActivatedRoute,
     private songService:SongService,
     private artistService:ArtistService,
     private albumService:AlbumService,
     private genreService:GenreService,
     private authService:AuthService,
     private userService:UserService,
     private messageService:MessageService){

  }

  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      if(this.id !=undefined && this.id!=0){
        this.getSong()
      }
    })
    
  }
  getSong()
  {
    this.songService.getSongWithIncludes(this.id).subscribe(response =>{
      this.messages = response.messages;
      
      this.currentSong = response;
      this.songService.setCurrentSong(response);

      this.getUser();
      this.getImagesProfile()
      this.getArtist();
      this.getAlbum();
      this.getGenre();

    })
  }
  getUser()
  {
    this.authService.getUser().then((result:User|string) => {
      if(typeof(result) == "object")
      {
        const index = result.likedSongs.findIndex(song => song.id == this.currentSong.id);
        
        if(index !== -1)
        {
          this.like = true;
        }

        this.user = result;
        this.userId = result.id
      }
    })
  }

  getArtist()
  {
    this.artistService.Get(this.currentSong.artistId).subscribe(response=>{
      this.artist = response
  
    })
  }
  getAlbum()
  {
    this.albumService.Get(this.currentSong.albumId).subscribe(Response =>
      {
        this.album=Response;
      })
  }
  getGenre()
  {
    this.genreService.Get(this.currentSong.genreId).subscribe(Response=>{
      this.genre=Response;
    })
  }
  addLike()
  {
    if (this.icon?.nativeElement.classList.contains('bi-heart')) {
      // se adauga like-ul
      this.userService.addLike(this.currentSong,this.userId).subscribe(resp =>
        {
          this.authService.reloadUser();
          this.getUser();
        });
      this.icon?.nativeElement.classList.remove('bi-heart');
      this.icon?.nativeElement.classList.add("bi-heart-fill");
    }
    else if (this.icon?.nativeElement.classList.contains('bi-heart-fill')) {
      // se inlatura like-ul
      this.userService.removeLike(this.currentSong,this.userId).subscribe(resp =>
        {
          this.authService.reloadUser();
          this.getUser();
        });
      this.icon?.nativeElement.classList.remove('bi-heart-fill');
      this.icon?.nativeElement.classList.add("bi-heart");
    }
  }

  addLikeToMessage(event:Event,message:Message)
  {
    const element = event.target as HTMLElement;
    const classes = element.classList;
    classes.remove('bi-heart')
    classes.add('bi-heart-fill')
   
      
    
    this.messageService.AddLike(this.userId,message.id).subscribe( resp=>{ 
      
    })
  }
  removeLikeToMessage(event:Event,message:Message)
  {
    const element = event.target as HTMLElement;
    const classes = element.classList;
    classes.remove('bi-heart-fill')
    classes.add('bi-heart')
    this.messageService.RemoveLike(this.userId,message.id).subscribe(resp=>{
      
    })
  }

  sendMessage()
  {
    this.messageSend.whoSentId = this.user.id;
    this.messageSend.songId = this.currentSong.id;
    this.messageSend.song = this.currentSong;
    this.messageSend.song.messages = [];
    this.messageService.AddMessage(this.messageSend).subscribe(resp=>{
      this.getSong()
    })
  }
  getImagesProfile()
  {
    var observables:Observable<User>[] = [];
    this.messages.forEach(element => {
      observables.push(this.userService.GetByStringId(element.whoSentId));
    });

    forkJoin(observables).subscribe(users => {
      this.messageUsers = users;
      console.log(this.messageUsers);
    });

  }
  verify(message:Message)
  {
    return this.user?.messages.findIndex(m => m.id == message.id)!=-1;
  }
  deleteItem(id:number)
  {
    this.messageService.DeleteMessage(id,this.currentSong.id).subscribe(resp =>{
      this.getSong();
    })
  }
 

}
