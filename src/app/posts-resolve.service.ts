import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Post } from './post';
import { PostService } from './post.service';

@Injectable()
export class PostsResolveService implements Resolve<Post[]> {

  constructor(private _postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {

    // Si la ruta de navegacion contiene un parametro que identifica al autor
    // realizamos una consulta al servidor distinta a la que se realiza por defecto.
    if(route.params.userId) {
      return this._postService.getUserPosts(route.params.userId);
    }

    /*=========================================================================|
    | Yellow Path                                                              |
    |==========================================================================|
    | Modifica este Resolve para que, en caso de tener que obtener los posts   |
    | correspondientes a una categoría, llame a la función 'getCategoryPosts()'|
    | del servicio PostService. Recuerda mirar en los parámetros de la ruta, a |
    | ver qué encuentras.                                                      |
    |=========================================================================*/
    if(route.params.categoryId) {
      return this._postService.getCategoryPosts(route.params.categoryId);
    }

    //
    return this._postService.getPosts();
  }

}
