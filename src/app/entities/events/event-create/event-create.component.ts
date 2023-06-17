import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/Artist.model';
import { Event } from 'src/app/models/Event.model';
import { ArtistService } from 'src/app/services/artist.service';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/Location.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  event:Event = new Event();
  allArtists:Artist[] = []
  locations:Location[] = []
  location:Location = new Location()
  selectedLocation:string="";
  selectedArtist:string = ""
  selectedArtists:Artist[] = []
  formData:FormData = new FormData()
  displayNewLocation: boolean = false;
  textNewLocation  = "Add new location"

  constructor(private artistService:ArtistService,
    private locationService:LocationService, 
    private eventService:EventService){}

  ngOnInit(): void {
    this.getAllArtists();
    this.getAllLocations();
    //this.locationService.Delete(1).subscribe();
  }
  getAllArtists()
  {
    this.artistService.GetAll().subscribe(resp =>{
      this.allArtists = resp;
      this.selectedArtist = this.allArtists[0].name;
    })
  }
  getAllLocations()
  {
    this.locationService.GetAll().subscribe(resp =>{
      this.locations = resp;
      this.selectedLocation = this.locations[0].name;
      console.log(resp)
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
    var artist = this.allArtists.find( s=> s.name == this.selectedArtist);
    if(artist!=undefined && !this.selectedArtists.includes(artist))
    {
      this.selectedArtists.push(artist);
    }
  }
  remove(artist:Artist)
  {
    const index = this.selectedArtists.indexOf(artist);
    if (index > -1) {
      this.selectedArtists.splice(index, 1);
   }
  }
  save()
  {
    var location = this.locations.find( s=> s.name == this.selectedLocation);
    if(location !=undefined)
    {
      this.event.locationId = location.id
    }
    this.event.artistIds = [];
    this.event
    this.eventService.Add(this.event).subscribe( resp =>{
      this.event = resp;
      this.selectedArtists.forEach(element => {
        this.AddArtist(element.id)
      });
    });
    
  }
  AddArtist(artistId:number)
  {
    this.eventService.AddArtist(this.event.id,artistId).subscribe();
  }
  addNewLocation()
  {
    this.displayNewLocation = !this.displayNewLocation;
    if(this.textNewLocation == "Add new location")
    {
      this.textNewLocation = "Cancel"
    }
    else{
      this.textNewLocation = "Add new location"
    }
  }
  saveLocation()
  {
    this.locationService.Add(this.location).subscribe(resp=>{
      this.location = resp
      this.getAllLocations();
    })
  }
}
