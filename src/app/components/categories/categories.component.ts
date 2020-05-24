import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  
  categorias: any = [];
  loading : boolean;

  error : boolean;
  mensajeError : string;

  constructor(private ruta : Router,
             private spotifyServ : SpotifyService) { 

    this.loading = true;
    this.error = false;
    
    this.getCategories();

  }

  ngOnInit() {
  }
  
  getCategories(){
    this.spotifyServ.getCategoria()
    .pipe(
          take(1)
          )
    .subscribe(data => {
      console.log('categoria');
      console.log(data);
      this.categorias = data['categories'].items;
      this.loading = false;
    }, (errorServicio)=>{
      this.error = true;
      this.loading = false;
      console.log('Error Servicio Categorias');
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    });
  }

  verPlaylistCategories(item : any){
    let categoriaId;
    console.log('PLAYLIST');
    console.log(item);
    
    if( item.id ){
      categoriaId = item.id;
    }
    this.ruta.navigate([ '/categoria', categoriaId ]);
  
  }
}
