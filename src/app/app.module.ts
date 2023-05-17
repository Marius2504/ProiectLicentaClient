import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'
import { headerComponent } from './header/header.component';
import { SongComponent } from './entities/songs/song/song.component';
import { SongEditComponent } from './entities/songs/song-edit/song-edit.component';
import { SongDetailsComponent } from './entities/songs/song-details/song-details.component';
import { AlbumComponent } from './entities/albums/album/album.component';
import { AlbumEditComponent } from './entities/albums/album-edit/album-edit.component';
import { AlbumDetailsComponent } from './entities/albums/album-details/album-details.component';
import { ArtistComponent } from './entities/artists/artist/artist.component';
import { ArtistDetailsComponent } from './entities/artists/artist-details/artist-details.component';
import { ArtistEditComponent } from './entities/artists/artist-edit/artist-edit.component';
import { SongBarComponent } from './song-bar/song-bar.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { HeaderInterceptor } from './Interceptor/HeaderInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumCreateComponent } from './entities/albums/album-create/album-create.component';
import { EventDetailsComponent } from './entities/events/event-details/event-details.component';
import { EventEditComponent } from './entities/events/event-edit/event-edit.component';
import { EventCreateComponent } from './entities/events/event-create/event-create.component';
import { TicketDetailsComponent } from './entities/tickets/ticket-details/ticket-details.component';
import { TicketEditComponent } from './entities/tickets/ticket-edit/ticket-edit.component';
import { TicketCreateComponent } from './entities/tickets/ticket-create/ticket-create.component';
import { MyplaylistsComponent } from './entities/playlists/myplaylists/myplaylists.component';
import { PlaylistDetailsComponent } from './entities/playlists/playlist-details/playlist-details.component';
import { PlaylistEditComponent } from './entities/playlists/playlist-edit/playlist-edit.component';
import { PlaylistCreateComponent } from './entities/playlists/playlist-create/playlist-create.component';
import { ArtistCreateComponent } from './entities/artists/artist-create/artist-create.component';
import { SongCreateComponent } from './entities/songs/song-create/song-create.component';
import { UserDetailsComponent } from './entities/users/user-details/user-details.component';
import { UserEditComponent } from './entities/users/user-edit/user-edit.component';
import { AllusersComponent } from './entities/users/allusers/allusers.component';

const appRoutes:Routes = [
  {path:'',component:MainComponent},
  {path:'album/id',component:AlbumDetailsComponent},
  {path:'album/id/edit',component:AlbumEditComponent},
  {path:'album/create',component:AlbumCreateComponent},

  {path:'event/id',component:EventDetailsComponent},
  {path:'event/id/edit',component:EventEditComponent},
  {path:'event/create',component:EventCreateComponent},

  {path:'ticket/id',component:TicketDetailsComponent},
  {path:'ticket/id/edit',component:TicketEditComponent},
  {path:'ticket/create',component:TicketCreateComponent},

  {path:'myplaylists',component:MyplaylistsComponent},
  {path:'playlist/id',component:PlaylistDetailsComponent},
  {path:'playlist/id/edit',component:PlaylistEditComponent},
  {path:'playlist/create',component:PlaylistCreateComponent},

  {path:'artist/id',component:ArtistDetailsComponent},
  {path:'artist/id/edit',component:ArtistEditComponent},
  {path:'artist/create',component:ArtistCreateComponent},

  {path:'song/id',component:SongDetailsComponent},
  {path:'song/id/edit',component:SongEditComponent},
  {path:'song/create',component:SongCreateComponent},

  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'users',component:AllusersComponent},
  {path:'user/id',component:UserDetailsComponent},
  {path:'user/id/edit',component:UserEditComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    SongComponent,
    SongEditComponent,
    SongDetailsComponent,
    AlbumComponent,
    AlbumEditComponent,
    AlbumDetailsComponent,
    ArtistComponent,
    ArtistDetailsComponent,
    ArtistEditComponent,
    SongBarComponent,
    MainComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
