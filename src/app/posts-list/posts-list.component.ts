import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Post } from '../post';

// Importamos Router para poder hacer la Inyeccion de Dependencias.
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent {

  @Input() posts: Post[];
  
  // Inyectamos como dependencia 'Router' para poder realizar la navegación.
  constructor (private _router: Router) { }

  // Implementamos el manejador del evento que se ejecutara cuando se reciba el click.
  verDetallePost(postID: number):void {
    // Navegamos a la dirección '/post/' más el ID del post seleccionado.
    this._router.navigate([`/posts/${postID}`]);
  }
  // Implementamos el manejador del evento que se ejecutara cuando se reciba el click.
  verAutorPost(userID: number):void {
    // Navegamos a la dirección '/post/users' más el ID del autor seleccionado.
    this._router.navigate([`/posts/users/${userID}`]);
  }

}
