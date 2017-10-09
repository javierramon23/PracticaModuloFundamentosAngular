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

  /*=========================================================================|
  | Red Path                                                                 |
  |==========================================================================|
  | Maneja el evento del componente PostPreviewComponent que indica la       |
  | selección del autor de un post y navega a la dirección correspondiente.  |
  | Recuerda que para hacer esto necesitas inyectar como dependencia el      |
  | Router de la app. La ruta a navegar es '/posts/users', pasando como      |
  | parámetro el identificador del autor.                                    |
  |=========================================================================*/

  // Implementamos el manejador del evento que se ejecutara cuando se reciba el click.
  verDetallePost(postID: number):void {
    // Navegamos a la dirección '/post/' más el ID del post seleccionado.
    this._router.navigate([`/posts/${postID}`]);
  }

}
