import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/Artist.model';
import { Event } from 'src/app/models/Event.model';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  event:Event = new Event();
  allArtists:Artist[] = []
  selectedArtist:string = ""
  selectedArtists:Artist[] = []
  formData:FormData = new FormData()
  constructor(private artistService:ArtistService){}
  ngOnInit(): void {
    this.getAllArtists();
  }
  getAllArtists()
  {
    this.artistService.GetAll().subscribe(resp =>{
      this.allArtists = resp;
    })
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    //this.formData.append(this.user.id,'id')
  }

  change()
  {
    console.log("da")
  }
  save()
  {

  }
  

}
