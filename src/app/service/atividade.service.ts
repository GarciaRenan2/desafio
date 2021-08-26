import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'

import { Atividade, Atividades } from '../models/atividade';

const API = 'http://localhost:4000';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  // listagem da atividades em aberto
  atividadeListOpen(): Observable<Atividades>{
    return this.httpClient.get<Atividades>(`${API}/atividades`);
  }

  // listagem da atividades finalizadas
  atividadeListFinalized(): Observable<Atividades>{
    return this.httpClient.get<Atividades>(`${API}/atividades/finalizadas`);
  }

  // busca atividade por id
  getById(id: number): Observable<Atividade>{
    return this.httpClient.get<Atividade>(`${API}/atividade/${id}`);
  }

  // adicionar nova atividade
  adicionar(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.post<Atividade>(`${API}/adicionar`, {
      atividade
    })
  }

  // editar atividade
  editar(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.put<Atividade>(`${API}/atividade/${atividade.idAtividade}`,{
      atividade
    })
  }

  // deletar atividade
  deletar(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${API}/atividade/${id}`)
  }

  // configuração mensagem do material
  message(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "bottom"
    })
  }
}
