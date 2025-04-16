import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FrequenciaService } from './service/frequencia.service';
import { ListFrequenciaPeriodoComponent } from './components/list-frequencia-periodo/list-frequencia-periodo.component';

const routes: Routes = [
  { path: '', component: ListFrequenciaPeriodoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        FrequenciaService
    ]
})
export class FrequenciaModule { } 