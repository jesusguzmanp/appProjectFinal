import { Injectable,OnInit, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements OnInit  {

  
  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
   
  }


  getQuery(query : string){
      const url = `${environment.url}${ query }`;
      const headers = new HttpHeaders({
        Authorization:  sessionStorage.getItem('token') 
    });
    return this.http.get(url, {headers});

  }


  getNewReleases() {
      
    //return this.getQuery('browse/new-releases?limit=20').pipe( map( data =>data['albums'].items ));
    return this.getQuery('browse/new-releases?limit=20');

    
  }

  getArtistas( termino: string){
      
    //return this.getQuery(`search?q=${ termino }&type=artist&limit=20`).pipe( map( data => data['artists'].items));
    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`);
  }

  getArtista( idArtista: string){
      
    return this.getQuery(`artists/${ idArtista }`);

  }

  getTopTrack(idArtista : string){
    //return this.getQuery(`artists/${ idArtista }/top-tracks?country=ES`).pipe( map( data => data['tracks']));
    return this.getQuery(`artists/${ idArtista }/top-tracks?country=ES`);
  }

  getToken()
  {
     
    return this.http.get(`${environment.urlToken}${environment.clientID}/${environment.clientSecret}`)
    .pipe(map((data : any) =>{
       return sessionStorage.setItem('token', `Bearer ${data.access_token}`);
      }));
   }

   getCategoria(){

      //return this.getQuery("browse/categories?country=ES&locale=es_ES").pipe(map(data => data['categories'].items));
      return this.getQuery("browse/categories?country=ES&locale=es_ES");
   }

   getCategoriaPlay(idCateg : string){
     //return this.getQuery(`browse/categories/${ idCateg}?country=ES&locale=es_ES`).pipe( map(data => data))
     return this.getQuery(`browse/categories/${ idCateg}?country=ES&locale=es_ES`);
   }

   getPlaylistsPorCateg(idCategoria : string){
        //return this.getQuery(`browse/categories/${ idCategoria }/playlists`).pipe( map( data => data['playlists'].items));
        return this.getQuery(`browse/categories/${ idCategoria }/playlists`);
   }
  
 
}
