import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  titulo: string = 'CloudClinicas';
  subtitulo: string = 'Sistema de gestión de clientes OnLine';

  ngOnInit(): void {
  }

}
