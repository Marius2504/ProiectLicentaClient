import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { UserDetailsComponent } from './entities/users/user-details/user-details.component';
import { UserEditComponent } from './entities/users/user-edit/user-edit.component';
import { ClickStopPropagation } from './directives/ClickStopPropagation.directive';
import { AppRoutingModel } from './app-routing.model';
import { AllusersComponent } from './entities/users/allusers/allusers.component';
import { MySongsComponent } from './entities/songs/my-songs/my-songs.component';
import { GenreCreateComponent } from './entities/genres/genre-create/genre-create.component';
import { GenreComponent } from './entities/genres/genre/genre.component';
import { GenreEditComponent } from './entities/genres/genre-edit/genre-edit.component';
import { AllgenreComponent } from './entities/genres/allgenre/allgenre.component';
import { SongCreateComponent } from './entities/songs/song-create/song-create.component';
import { MyAlbumsComponent } from './entities/albums/my-albums/my-albums.component';
import { AlbumCreateComponent } from './entities/albums/album-create/album-create.component';
import { EventCreateComponent } from './entities/events/event-create/event-create.component';
import { LocationComponent } from './entities/locations/location/location.component';
import { LocationCreateComponent } from './entities/locations/location-create/location-create.component';
import { TrendingComponent } from './entities/songs/trending/trending.component';
import { MyplaylistsComponent } from './entities/playlists/myplaylists/myplaylists.component';
import { NopageComponent } from './entities/nopage/nopage.component';
import { environment } from './enviroments/enviroments';
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
    RegisterComponent,
    ClickStopPropagation,
    UserDetailsComponent,
    UserEditComponent,
    AllusersComponent,
    MySongsComponent,
    GenreCreateComponent,
    GenreComponent,
    GenreEditComponent,
    AllgenreComponent,
    SongCreateComponent,
    MyAlbumsComponent,
    AlbumCreateComponent,
    EventCreateComponent,
    LocationComponent,
    LocationCreateComponent,
    TrendingComponent,
    MyplaylistsComponent,
    NopageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModel
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
