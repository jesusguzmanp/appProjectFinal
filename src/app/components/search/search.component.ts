import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { isNull } from 'util';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent  {

  artistas: any [] = [];
  loadingSearch : boolean;

  error : boolean;
  mensajeError : string;

  constructor(private spotifyServ: SpotifyService) {
   }

  buscar(busc : string){    
    console.log(busc.length);
    if(busc.length === 0){
      this.artistas = [];
    }
    if(busc === null || busc === "" ){       
      this.loadingSearch = false;
    }else{     
      this.loadingSearch = true;
    }
    if(busc){
      this.spotifyServ.getArtistas(busc)
      .pipe(
            take(1)
            )
      .subscribe( (data : any)=> {
          console.log(data);
          this.artistas = data['artists'].items;
          this.loadingSearch = false;
      },(errorServicio)=>{
        console.log('Error Servicio Artista');
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
      }
      );
    }
  }

}
