import { Component, OnInit } from '@angular/core';
import { AtividadeService } from 'src/app/service/atividade.service';
import { Atividades } from '../../models/atividade';

@Component({
  selector: 'app-finalizada',
  templateUrl: './finalizada.component.html',
  styleUrls: ['./finalizada.component.css'],
})
export class FinalizadaComponent implements OnInit {
  atividades: Atividades = [];
  displayedColumns = ['idAtividade', 'titulo', 'descTipo', 'action'];

  constructor(private atividadeService: AtividadeService) {}

  ngOnInit(): void {
    this.atividadeService.atividadeListFinalized().subscribe(
      list => this.atividades = list
    );
  }
}
