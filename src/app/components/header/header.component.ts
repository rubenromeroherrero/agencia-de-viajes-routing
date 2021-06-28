import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // generamos un output para que emita la tarea al service
  @Output() cerrarSesion = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  cerrarSesionClick(): void {
    if (confirm('¿Seguro que desea cerrar la sesión?')) {
      this.cerrarSesion.emit();
    }
  }
}
