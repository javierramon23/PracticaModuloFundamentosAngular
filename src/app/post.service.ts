import { Injectable, Inject } from '@angular/core';
// Importamos HttpParams para poder personalozar/parametrizar las peticiones HTTP.
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
//
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { Post } from './post';

@Injectable()
export class PostService {

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<Post[]> {

    // Almacenamos la fecha actual del sistema para realizar la comparacion.
    const fechaActual: string = String(Date.now());

    // Creamos un objeto de opciones que le pasaremos a la peticion GET.
    const opciones = {
      params: new HttpParams()
      .set('publicationDate_lte', fechaActual)
      .set('_sort','publicationDate')
      .set('_order','desc')
    }

    // Se realia la petición de Post's con las opciones de filtrado y ordenación establecidas.
    return this._http.get<Post[]>(`${environment.backendUri}/posts`, opciones);
  }

  getUserPosts(id: number): Observable<Post[]> {

    // Almacenamos la fecha del sistema.
    const fechaActual: string = String(Date.now());
    // Almacenamos el Id del autor.
    const autorId: string = String(id);

    // Creamos un objeto de opciones que le pasaremos a la peticion GET.    
    const opciones = {
      params: new HttpParams()
      .set('author.id',autorId)
      .set('publicationDate_lte', fechaActual)
      .set('_sort','publicationDate')
      .set('_order','desc')
    }

     // Se realia la petición de Post's con las opciones de filtrado y ordenación establecidas.
     return this._http.get<Post[]>(`${environment.backendUri}/posts`, opciones);
  }

  getCategoryPosts(id: number): Observable<Post[]> {
    // Almacenamos la fecha del sistema.
    const fechaActual: string = String(Date.now());

    // Creamos un objeto de opciones que le pasaremos a la peticion GET.    
    const opciones = {
      params: new HttpParams()
      .set('publicationDate_lte', fechaActual)
      .set('_sort','publicationDate')
      .set('_order','asc')
    }

     return this._http
      .get<Post[]>(`${environment.backendUri}/posts`, opciones)
      // Utilizamos la función MAP que proporciona RxJS para realizar un 'FILTRADO' de la colección de Post's
      // de manera que vamos a crear una coleccion de Post's 'nueva' que solo incluya aquellos cuyo atributo 'categories'
      // incluya una con el mismo ID que le llega desde 'fuera'.
      .map(function(posts: Post[]): Post[]{
        let postFiltrados: Post[] = [];
        for(let indexPost = 0; indexPost < posts.length; indexPost ++){         
          for(let indexCategories = 0; indexCategories < posts[indexPost].categories.length; indexCategories ++){
            if(posts[indexPost].categories[indexCategories].id == id){
              postFiltrados.push(posts[indexPost]);
              break;
            }
          }
        }
        return postFiltrados;
      });
  }

  getPostDetails(id: number): Observable<Post> {
    return this._http.get<Post>(`${environment.backendUri}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    // Realizamos la peticion de inserción al servidor, a la dirección del recurso,
    // pasando en la solicitud el post que se ha definido con los datos introducidos en el formulario.
    return this._http.post<Post>(`${environment.backendUri}/posts`,post);
  }

}
