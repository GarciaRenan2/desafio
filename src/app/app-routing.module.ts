import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarComponent } from './atividade/adicionar/adicionar.component';

import { AtividadeComponent } from './atividade/atividade.component';
import { FinalizadaComponent } from './atividade/finalizada/finalizada.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AtividadeComponent,
  },
  {
    path: 'finalizadas',
    component: FinalizadaComponent,
  },
  {
    path: 'adicionar',
    component: AdicionarComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
