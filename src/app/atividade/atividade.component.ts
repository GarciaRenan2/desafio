import { AtividadeService } from './../service/atividade.service';
import { Component, OnInit } from '@angular/core';
import { Atividades } from '../models/atividade';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css']
})
export class AtividadeComponent implements OnInit {

  atividades: Atividades = [];
  displayedColumns = ['idAtividade', 'titulo', 'descTipo', 'action']

  constructor(private atividadeService: AtividadeService) { }

  ngOnInit(): void {
    this.atividadeService.atividadeListOpen().subscribe((list) => this.atividades = list);
  }

}
