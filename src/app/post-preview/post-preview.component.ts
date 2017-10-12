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

  // Decoramos el atributo 'postPulsado' como de salida para poder emitir el evento 'click'
  // desde este componente hijo a su padre.
  // Utilizamos el tipo de dato 'number' en el generico puesto que vamos a enviar un numero de ID.
  @Output() postPulsado: EventEmitter<number> = new EventEmitter<number>();
  // Decoramos el atributo 'autorPulsado' como de salida para poder emitir el evento 'click'
  // desde este componente hijo a su padre.
  // Utilizamos el tipo de dato 'number' en el generico puesto que vamos a enviar un numero de ID.
  @Output() autorPulsado: EventEmitter<number> = new EventEmitter<number>();

  // Deinimos el manejador que se encarga de notificar al componente padre que se ha pulsado un post
  notificarPostPulsado(postID: number): void {
    // Emitimos el evento junto con el ID del post pulsado.
    this.postPulsado.emit(postID);
  }

  // Deinimos el manejador que se encarga de notificar al componente padre que se ha pulsado el nombre de un autor
  notificarAutorPulsado(userID: number): void {
    // Emitimos el evento junto con el ID del autor pulsado.
    this.autorPulsado.emit(userID);
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, '</p><p>')}</p>` : '';
  }

}
