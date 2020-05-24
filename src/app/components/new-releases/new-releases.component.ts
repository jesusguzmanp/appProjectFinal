import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styles: []
})
export class NewReleasesComponent implements OnInit {
  
  subscripcion : Subscription;
      
  
  nuevasCanciones: any[] = [];
  loading : boolean;

  error : boolean;
  mensajeError : string;

  constructor(private spotifyServ : SpotifyService) {
      
      this.loading = true;
      this.error = false;

      if (!sessionStorage.getItem('token')) {
        this.getToken();
      } else {
        this.getNewReleases();
      }

     
    

   }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

  getToken() {
    this.subscripcion = this.spotifyServ.getToken().subscribe(data =>{
      console.log('token');
      console.log(data); this.getNewReleases(); 
    }, (errorServicio)=>{
      console.log('Error Servicio Token');
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    }
      );
  }

  getNewReleases() {
      
    
    this.subscripcion =this.spotifyServ.getNewReleases()
    .pipe(
      take(1)
      )    
    .subscribe( (data : any ) => {
      console.log(data);
      this.nuevasCanciones = data['albums'].items;          
      this.loading = false;
    }, (errorServicio)=>{
      this.error = true;
      this.loading = false;
      console.log(errorServicio);     
      if(errorServicio.error.error.message === "The access token expired"){
        console.log("entre a log");
        this.getToken();
      } 
      this.mensajeError = errorServicio.error.error.message;
  });
  }

}