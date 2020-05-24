import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-categories',
  templateUrl: './playlist-categories.component.html',
  styleUrls: ['./playlist-categories.component.css']
})
export class PlaylistCategoriesComponent implements OnInit {
  categoria : any = [];
  playlistCatego : any = [];

  loadingArtists : boolean;
  
  
  mensajeError : string;

  constructor(private router : ActivatedRoute,
             private spotify : SpotifyService) { 
        this.loadingArtists = true;
        this.router.params.subscribe ( parms =>{
          console.log('PARAMS COMPONENTE');
          console.log(parms);
          this.getCategoriaId(parms['id']);
          this.getPlaylist(parms['id']);
        } )
    }

  ngOnInit() {
  }
  
  getCategoriaId(idCateg : string){
    this.loadingArtists = true;
    this.spotify.getCategoriaPlay(idCateg)
    .pipe(
      take(1)
    )
    .subscribe(categPlay =>{
      console.log('Categoria Detalle');
      console.log(categPlay);
      this.categoria = categPlay;
      this.loadingArtists = false
    }, (errorServicio)=>{
      console.log('Error Servicio Categoria detalle');
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    }
    );
  }
  
  getPlaylist(id : string){
    
    this.loadingArtists = true;
    this.spotify.getPlaylistsPorCateg(id)
      .pipe(
        take(1)
      )
      .subscribe (playlist =>{
        console.log('PlayList');
        console.log(playlist);
        this.playlistCatego = playlist['playlists'].items;
        this.loadingArtists = false
      }, (errorServicio)=>{
        console.log('Error Servicio Playlist Categ detalle');
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
      }
      );

  }


  
 
}
