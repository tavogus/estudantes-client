import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'escolas',
    loadChildren: () => import('./escola/escola.module').then(m => m.EscolaModule)
  },
  {
    path: 'alunos',
    loadChildren: () => import('./aluno/aluno.module').then(m => m.AlunoModule)
  },
  {
    path: 'frequencias',
    loadChildren: () => import('./frequencia/frequencia.module').then(m => m.FrequenciaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
