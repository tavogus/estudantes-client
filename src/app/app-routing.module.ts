import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'escola',
    loadChildren: () => import('./escola/escola.module').then(m => m.EscolaModule)
  },
  {
    path: 'aluno',
    loadChildren: () => import('./aluno/aluno.module').then(m => m.AlunoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
