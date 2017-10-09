import * as moment from 'moment';
import 'moment/locale/es';

// Importamos 'Piperansform' y 'Pipe' para poder utilizar los pipes en la APP.
import { PipeTransform, Pipe } from '@angular/core';

// Decoramos la Clase para que esta se comporte como un Pipe, definimos su METADATO 'name' para poder hacer
// referencia a él desde el TEMPLATE.
@Pipe({
    name: 'fromNow'
})
// La clase que FromNowPipe debe implementar PipeTransform para funcionar.
export class FromNowPipe implements PipeTransform { 
    // Al implementar PipeTransform, nuestra Pipe debe incluir el metodo transform
    // que es el encargado de realizar la transformacion de los datos.
    // Esta funcion debe incluir obligatoriamente como minimo un parametro de entrada
    // que determina el datos que se quiere transformar.
    transform(fecha: string): string {
        // Devolvemos la fecha del post con un formato más legible.
        return `Post publicado ${moment(fecha).fromNow()}`;
    }
}
