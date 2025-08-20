import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./_components/navbar/navbar.component";
import { BaseUiComponent } from "./_components/base-ui/base-ui.component";

import { RouterOutlet } from '@angular/router';
import { CertificadoService } from './_services/certificado.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, BaseUiComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gerador-certificado';
  navbarVisible: boolean = true;

  constructor(private certificadoService: CertificadoService){}

  ngOnInit(): void {
    const certificados = localStorage.getItem('certificados');
    this.certificadoService.certificados = certificados ? JSON.parse(certificados) : [];
    console.log(this.certificadoService.certificados)
  }
}
