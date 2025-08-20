import { Component, ViewChild } from '@angular/core';
import { SecondaryButtonComponent } from "../../_components/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../_components/primary-button/primary-button.component";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
import { CertificadoService } from '../../_services/certificado.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-certificado-form',
  imports: [SecondaryButtonComponent, PrimaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {

  constructor(private certificadoService: CertificadoService) { }
  @ViewChild('form') form!: NgForm;

  certificado: Certificado = { id: '', nome: '', actividades: [], dataEmissao: '' };

  actividade: string = '';

  campoValido(control: NgModel) {
    return control.invalid && control.touched;
  }

  formValido() {
    return this.certificado.nome.length > 0 && this.certificado.actividades.length > 0;
  }

  adicionarAtividade() {
    this.certificado.actividades.push(this.actividade);
    this.actividade = '';
  }

  removeAtividade(index: number) {
    this.certificado.actividades.splice(index, 1);
  }

  submit() {
    if (!this.formValido()) {
      console.error('Formulário inválido');
      return;
    }
    this.certificado.dataEmissao = this.dataActual();
    this.certificado.id = uuidv4();
    this.certificadoService.adicionarCertificado(this.certificado);

    this.certificado = this.estadoInicialCertificado();
    this.form.resetForm();
  }

  dataActual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
    const ano = dataAtual.getFullYear();
    const dataFormadata = `${dia}/${mes}/${ano}`;

    return dataFormadata;
  }

  estadoInicialCertificado(): Certificado {
    return {
      id: '', nome: '', actividades: [], dataEmissao: ''
    }
  }
}
