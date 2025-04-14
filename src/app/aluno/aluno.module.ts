import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormAlunoComponent } from './components/form-aluno/form-aluno.component';

const routes: Routes = [
  {
    path: 'novo',
    component: FormAlunoComponent
  },
  {
    path: 'editar/:id',
    component: FormAlunoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AlunoModule { }
