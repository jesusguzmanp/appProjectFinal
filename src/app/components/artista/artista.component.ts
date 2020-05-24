import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {
  
  urlArtist="https://open.spotify.com/embed/track/";

  artista : any = [];
  topTracks :any = [];

  loadingArtists : boolean;
  
  mensajeError : string;

  constructor( private router : ActivatedRoute,
               private spotify : SpotifyService) { 
      this.loadingArtists = true;

      this.router.params.subscribe ( parms =>{
        this.getArtista( parms['id'] ) ;
        this.getTopTracks( parms['id'] ) ;
      } )
  }

  ngOnInit() {
  }

  getArtista(id : string){
    
    this.loadingArtists = true;
    this.spotify.getArtista(id)
    .pipe(
          take(1)
          )
    .subscribe (artista =>{
      console.log('artista');
      console.log(artista);
      this.artista = artista;
      this.loadingArtists = false
    }, (errorServicio)=>{
      console.log('Error Servicio Artista detalle');
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    }
    );

  }

  getTopTracks(id : string){

    this.spotify.getTopTrack(id)
    .pipe(
        take(1)
        )
    .subscribe (topTrack =>{
      console.log('topTracks');
      console.log(topTrack);
      this.topTracks = topTrack['tracks'];
    }, (errorServicio)=>{
      console.log('Error Servicio Top Tracks');
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    }
    );

  }

}
