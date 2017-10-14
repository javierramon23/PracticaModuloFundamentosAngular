// Se importa EventEmitter para poder utilizarlo.
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../category';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent {

  @Input() categories: Category[];

  // Decoramos un atributo para poder realizar la emision del evento del hijo al padre.
  @Output() categoriaPulsada: EventEmitter<number> = new EventEmitter<number>();
  
  // Manejador del evento 'click' del template que emite un evento para enviar al padra el
  // ID de la categoria pulsada.
  notificarCategoriaPulsada(categoriaID: number): void {
    console.log(categoriaID);
    this.categoriaPulsada.emit(categoriaID);
  }

}
