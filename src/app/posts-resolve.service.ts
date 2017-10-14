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

    // Si la ruta de navegacion contiene un parametro que identifica la categoria
    // realizamos una consulta al servidor distinta a la que se realiza por defecto.
    if(route.params.categoryId) {
      return this._postService.getCategoryPosts(route.params.categoryId);
    }

    // Peticion al servidor por defecto que devolverá el conjunto de Post's.
    return this._postService.getPosts();
  }

}
