// Importamos Output y EventEmitter para poder utilizarlos.
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {

  @Input() post: Post;

  /*=========================================================================|
  | Red Path                                                                 |
  |==========================================================================|
  | Expón un atributo de salida con el decorador correspondiente. El tipo de |
  | este atributo debe permitir la emisión de eventos; la idea es enviar al  |
  | componente padre el usuario sobre el cuál se ha hecho clic. Y puesto que |
  | dicho clic se realiza en el template de este componente, necesitas,      |
  | además, un manejador para el mismo.                                      |
  |=========================================================================*/

  // Decoramos el atributo 'postPulsado' como de salida para poder emitir el evento 'click'
  // desde este componente hijo a su padre.
  // Utilizamos el tipo de dato 'number' en el generico puesto que vamos a enviar un numero de ID.
  @Output() postPulsado: EventEmitter<number> = new EventEmitter<number>();

  // Deinimos el manejador que se encarga de notificar al componente padre que se ha pulsado un post
  notificarPostPulsado(postID: number): void {
    // Emitimos el evento junto con el ID del post pulsado.
    this.postPulsado.emit(postID);
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, '</p><p>')}</p>` : '';
  }

}
