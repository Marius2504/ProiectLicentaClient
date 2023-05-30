import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongEditComponent } from './entities/songs/song-edit/song-edit.component';
import { SongDetailsComponent } from './entities/songs/song-details/song-details.component';
import { AlbumEditComponent } from './entities/albums/album-edit/album-edit.component';
import { AlbumDetailsComponent } from './entities/albums/album-details/album-details.component';
import { ArtistDetailsComponent } from './entities/artists/artist-details/artist-details.component';
import { ArtistEditComponent } from './entities/artists/artist-edit/artist-edit.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { ArtistGuard } from './services/artist-guard.service';



const appRoutes:Routes = [
    {path:'',component:MainComponent},
    {path:'album/create',canActivate:[ArtistGuard],component:AlbumCreateComponent},
    {path:'album/:id',component:AlbumDetailsComponent},
    {path:'album/:id/edit',canActivate:[ArtistGuard] ,component:AlbumEditComponent},
    
    {path:'event/create',canActivate:[AdminGuard],component:EventCreateComponent},
    {path:'event/:id',component:EventDetailsComponent},
    {path:'event/:id/edit',canActivate:[AdminGuard],component:EventEditComponent},
    
    {path:'ticket/create',canActivate:[AdminGuard] ,component:TicketCreateComponent},
    {path:'ticket/:id', canActivate:[AuthGuard],component:TicketDetailsComponent},
    {path:'ticket/:id/edit',canActivate:[AdminGuard],component:TicketEditComponent},
    
  
    {path:'myplaylists', canActivate:[AuthGuard],component:MyplaylistsComponent},
    {path:'playlist/create', canActivate:[AuthGuard],component:PlaylistCreateComponent},
    {path:'playlist/:id',component:PlaylistDetailsComponent},
    {path:'playlist/:id/edit', canActivate:[AuthGuard],component:PlaylistEditComponent},
    
    {path:'artist/create', canActivate:[AdminGuard],component:ArtistCreateComponent},
    {path:'artist/:id',component:ArtistDetailsComponent},
    {path:'artist/:id/edit', canActivate:[AdminGuard],component:ArtistEditComponent},
    
  
    {path:'song/create',canActivate:[ArtistGuard],component:SongCreateComponent},
    {path:'song/:id',component:SongDetailsComponent},
    {path:'song/:id/edit',canActivate:[ArtistGuard],component:SongEditComponent},
    
  
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'users',component:AllusersComponent},
    {path:'user/edit', canActivate:[AuthGuard],component:UserEditComponent},
    {path:'user/:id',component:UserDetailsComponent},
    {path:'user/:id/edit', canActivate:[AdminGuard],component:UserEditComponent},
    
  ]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModel{

}