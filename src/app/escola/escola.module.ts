import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListEscolaComponent } from "./components/list-escola/list-escola.component";
import { FormEscolaComponent } from "./components/form-escola/form-escola.component";
import { EscolaService } from "./service/escola.service";

const routes: Routes = [
  { path: '', component: ListEscolaComponent },
  { path: 'nova', component: FormEscolaComponent },
  { path: 'editar/:id', component: FormEscolaComponent }
];

@NgModule({
    declarations: [
        ListEscolaComponent,
        FormEscolaComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        EscolaService
    ]
})
export class EscolaModule { }