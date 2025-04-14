import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormAlunoComponent } from './components/form-aluno/form-aluno.component';
import { ListAlunoComponent } from './components/list-aluno/list-aluno.component';

const routes: Routes = [
  {
    path: 'novo',
    component: FormAlunoComponent
  },
  {
    path: 'editar/:id',
    component: FormAlunoComponent
  },
  {
    path: ':id',
    component: ListAlunoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormAlunoComponent,
    ListAlunoComponent
  ]
})
export class AlunoModule { }
