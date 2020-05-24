import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

//RUTAS
import { ROUTES } from './app.routes';

//SERVICIOS
import { SpotifyService } from './services/spotify.service';

//PIPES
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { CategoriesComponent } from './components/categories/categories.component';
import { PlaylistCategoriesComponent } from './playlist-categories/playlist-categories.component';
import { NewReleasesComponent } from './components/new-releases/new-releases.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    DomseguroPipe,
    TarjetasComponent,
    LoadingComponent,
    CategoriesComponent,
    PlaylistCategoriesComponent,
    NewReleasesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true } )
  ],
  exports : [RouterModule],
  providers: [
    SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
