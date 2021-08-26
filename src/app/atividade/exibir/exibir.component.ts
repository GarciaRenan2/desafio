import { Component, OnInit } from '@angular/core';
import { AtividadeService } from 'src/app/service/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Atividade } from '../../models/atividade';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-exibir',
  templateUrl: './exibir.component.html',
  styleUrls: ['./exibir.component.css']
})
export class ExibirComponent implements OnInit {
  atividade!: Atividade;
  editar: boolean = true;

  novaAtividade = new FormGroup({
    titulo: new FormControl(),
    descricao: new FormControl('', Validators.minLength(50)),
    tipo: new FormControl(),
    finalizar: new FormControl()
  });
  descriptionLength = new BehaviorSubject(0);

  constructor(
    private atividadeService: AtividadeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // contagem dos caracteres da descricao
    this.novaAtividade.get('descricao')!.valueChanges.subscribe((v)=> this.descriptionLength.next(v.length));

    const id = +this.route.snapshot.paramMap.get('idAtividade')!;
    this.atividadeService.getById(id).subscribe((atividade) => {
      this.atividade = atividade;
    });
  }

  salvar(): void {
    this.atividadeService.editar(this.atividade).subscribe(() => {
      this.atividadeService.message("Atividade alterada com sucesso!");
      this.router.navigate(["/"]);
    });
  }

  edita(){
    this.editar = false;
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }

}
