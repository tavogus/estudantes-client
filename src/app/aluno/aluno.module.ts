import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormAlunoComponent } from './components/form-aluno/form-aluno.component';
import { ListAlunoComponent } from './components/list-aluno/list-aluno.component';
import { AlunoService } from './service/aluno.service';
import { CacheService } from '../shared/services/cache.service';

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
    path: 'escola/:id',
    component: ListAlunoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    FormAlunoComponent,
    ListAlunoComponent
  ],
  providers: [
    AlunoService,
    CacheService
  ]
})
export class AlunoModule { }
