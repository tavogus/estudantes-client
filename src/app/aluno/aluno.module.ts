import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlunoService } from './service/aluno.service';
import { FrequenciaService } from './service/frequencia.service';
import { FilterModalComponent } from '../shared/components/filter-modal/filter-modal.component';
import { ListAlunoComponent } from './components/list-aluno/list-aluno.component';
import { FormAlunoComponent } from './components/form-aluno/form-aluno.component';
import { FormFrequenciaComponent } from './components/form-frequencia/form-frequencia.component';
import { ListFrequenciaComponent } from './components/list-frequencia/list-frequencia.component';

const routes: Routes = [
  { path: 'novo', component: FormAlunoComponent },
  { path: 'editar/:id', component: FormAlunoComponent },
  { path: 'escola/:id', component: ListAlunoComponent },
  { path: 'frequencia/:id', component: FormFrequenciaComponent },
  { path: 'frequencias/:id', component: ListFrequenciaComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FilterModalComponent
    ],
    providers: [
        AlunoService,
        FrequenciaService
    ]
})
export class AlunoModule { }
