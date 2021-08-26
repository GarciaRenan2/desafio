import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/models/atividade';
import { AtividadeService } from 'src/app/service/atividade.service';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css'],
})
export class DeletarComponent implements OnInit {
  atividade!: Atividade;

  constructor(
    private atividadeService: AtividadeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('idAtividade')!;
    this.atividadeService.getById(id).subscribe((atividade) => {
      this.atividade = atividade;
    });
  }

  deleteAtividade(): void {
    this.atividadeService.deletar(this.atividade.idAtividade).subscribe(
      () => {
        this.atividadeService.message('Atividade excluida com sucesso!');
        this.router.navigate(['/']);
      },
      (err) => {
        this.atividadeService.message('Esse tipo de atividade não pode ser excluída!');
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
