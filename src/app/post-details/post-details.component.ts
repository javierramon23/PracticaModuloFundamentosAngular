import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NativeWindow } from '../window';
import { Post } from '../post';
// Importamos ROUTER para poder utilizarlo en la INYECCION de DEPENDENCIAS.
import { Router } from '@angular/router';

@Component({
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post;

  constructor(
    private _activatedRoute: ActivatedRoute,
    // Hacemos una INYECCION de DEPENDENCIAS para poder utilizar Router.
    private _router: Router,
    @Inject(NativeWindow) private _window) { }

  ngOnInit(): void {
    this._activatedRoute
        .data
        .subscribe((data: { post: Post }) => {
          this.post = data.post;
          this._window.scrollTo(0, 0);
        });
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, '</p><p>')}</p>` : '';
  }

  // Se añade un manejador para el evento 'click' para navegar hasta la direccion
  // de los post del autor, pasamos el ID del autor para poder mostrar solo los que
  // correspondan al autor indicado.
  verPostsAutor(autorID: number): void {
    this._router.navigate([`/posts/users/${autorID}`]);
  }
  
  // Manejador del componente padre que hace una navegación a una ruta definida.
  verPostCategoria(categoriaID: number): void {
    this._router.navigate([`/posts/categories/${categoriaID}`]);
  }

}
