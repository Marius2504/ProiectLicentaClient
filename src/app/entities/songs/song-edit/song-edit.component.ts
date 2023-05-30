import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Song } from 'src/app/models/Song.model';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {
  song: Song = new Song("",0,"","",0,0,0,0); 
  id:number = 0;
  constructor(private songService:SongService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      this.id = params['id'];
      
      if(this.id !=undefined && this.id!=null){
        this.songService.Get(this.id).subscribe(response =>{
          this.song = response;
        })
      }
    })
  }

  Update()
  {
    this.songService.Update(this.song).subscribe(Response =>{
      this.song = Response;
    })
  }

}
