import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  {
    path: 'newReleases',
    component: NewReleasesComponent,
    canActivate: [GuardAuthService],
  },
  //{ path: 'artist', component: ArtistDiscographyComponent },
  {
    path: 'artist/:id',
    component: ArtistDiscographyComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'search',
    component: SearchResultComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'search/:q',
    component: SearchResultComponent,
    canActivate: [GuardAuthService],
  },
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', component: NewReleasesComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
