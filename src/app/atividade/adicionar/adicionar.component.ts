import { AtividadeService } from 'src/app/service/atividade.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Atividade } from '../../models/atividade';


@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent implements OnInit {

  novaAtividade = new FormGroup({
    titulo: new FormControl(),
    descricao: new FormControl('', Validators.minLength(50)),
    tipo: new FormControl()
  });
  descriptionLength = new BehaviorSubject(0);

  constructor(
    private atividadeService: AtividadeService,
    private router: Router) { }

  ngOnInit(): void {

    // contagem dos caracteres da descricao
    this.novaAtividade.get('descricao')!.valueChanges.subscribe((v)=> this.descriptionLength.next(v.length));
  }

  salvar(): void {
    const atividadeForm: Atividade = this.novaAtividade.value;
    this.atividadeService
      .adicionar(atividadeForm)
      .subscribe(() => {
        this.novaAtividade.reset();
        this.atividadeService.message('Incluído com sucesso');
        this.router.navigate(['/']);
      });
  }

  validaDesc() {
    return this.novaAtividade.get('descricao');
  }

}


