import { Injectable, Inject } from '@angular/core';
// Importamos HttpParams para poder personalozar/parametrizar las peticiones HTTP.
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
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

    /*=========================================================================|
    | Yellow Path                                                              |
    |==========================================================================|
    | Ahora mismo, esta función está obteniendo todos los posts existentes, y  |
    | solo debería obtener aquellos correspondientes a la categoría indicada.  |
    | Añade los parámetros de búsqueda oportunos para que retorne solo los     |
    | posts que buscamos. Ten en cuenta que, además, deben estar ordenados por |
    | fecha de publicación descendente y obtener solo aquellos que estén       |
    | publicados.                                                              |
    |                                                                          |
    | Este Path tiene un extra de dificultad: un objeto Post tiene una         |
    | colección de objetos Categoria, y 'JSON Server' no permite filtrado en   |
    | colecciones anidadas. Por tanto, te toca a ti darle una solución a este  |
    | marrón. Una posibilidad sería aprovechar el operador 'map' de los        |
    | observables. Sirven para transformar flujos de datos y, de alguna forma, |
    | es lo que vamos buscando. Podríamos obtener todos los posts y luego      |
    | filtrarlos por categoría en 'map'. Ahí te lo dejo.                       |
    |                                                                          |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer el      |
    | filtro y ordenación de los datos en tus peticiones, pero te ayudo        |
    | igualmente. La querystring debe tener estos parámetros:                  |
    |                                                                          |
    |   - Filtro por fecha de publicación: publicationDate_lte=fecha           |
    |   - Ordenación: _sort=publicationDate&_order=DESC                        |
    |                                                                          |
    | Una pista más, por si acaso: HttpParams.                                 |
    |=========================================================================*/

     return this._http.get<Post[]>(`${environment.backendUri}/posts`);
  }

  getPostDetails(id: number): Observable<Post> {
    return this._http.get<Post>(`${environment.backendUri}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {

    /*=========================================================================|
    | Purple Path                                                              |
    |==========================================================================|
    | Utiliza el cliente HTTP para guardar en servidor el post indicado. La    |
    | ruta sobre la cual tienes que hacer la petición POST es '/posts'.        |
    | Recuerda que siempre que se crea una entidad en servidor es una buena    |
    | práctica retornar la misma con los datos actualizados obtenidos tras la  |
    | inserción.                                                               |
    |=========================================================================*/

    return null;
  }

}
