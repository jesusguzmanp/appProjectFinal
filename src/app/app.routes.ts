//RUTAS
import { Routes } from '@angular/router'

//COMPONENTES
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PlaylistCategoriesComponent } from './playlist-categories/playlist-categories.component';
import { NewReleasesComponent } from './components/new-releases/new-releases.component';

//GUARDS
import { AuthGuard } from './services/auth.guard';


export const ROUTES : Routes = [  
    { path: 'home', component: HomeComponent},
    { path: 'newReleases', component: NewReleasesComponent, canActivate : [ AuthGuard ]   },
    { path: 'search', component: SearchComponent, canActivate : [ AuthGuard ] },
    { path: 'categories', component: CategoriesComponent, canActivate : [ AuthGuard ] },
    { path: 'artist/:id', component: ArtistaComponent, canActivate : [ AuthGuard ] },
    { path: 'categoria/:id', component: PlaylistCategoriesComponent, canActivate : [ AuthGuard ] },
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
  