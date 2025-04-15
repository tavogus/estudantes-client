import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../service/aluno.service';
import { AlunoDTO } from '../../models/aluno-dto';
import { CommonModule } from '@angular/common';
import { FilterModalComponent } from '../../../shared/components/filter-modal/filter-modal.component';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-list-aluno',
  templateUrl: './list-aluno.component.html',
  styleUrls: ['./list-aluno.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FilterModalComponent,
    FormsModule,
    NgxSelectModule
  ],
  providers: [AlunoService]
})
export class ListAlunoComponent implements OnInit {
  alunos: AlunoDTO[] = [];
  loading = true;
  escolaId: number;
  showFilterModal = false;
  filters = {
    nome: '',
    cpf: '',
    tipoBeneficio: '',
    alerta: null as boolean | null
  };

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.escolaId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.loading = true;
    this.alunoService.listarPorEscola(this.escolaId, this.filters).subscribe({
      next: (alunos: AlunoDTO[]) => {
        this.alunos = alunos;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar alunos:', error);
        this.loading = false;
      }
    });
  }

  novoAluno(): void {
    this.router.navigate(['/alunos/novo']);
  }

  editarAluno(id: number): void {
    this.router.navigate(['/alunos/editar', id]);
  }

  confirmarExclusao(id: number): void {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      this.alunoService.excluir(id).subscribe({
        next: () => {
          this.carregarAlunos();
        },
        error: (error: any) => {
          console.error('Erro ao excluir aluno:', error);
        }
      });
    }
  }

  onFilterApply(filters: any): void {
    this.filters = filters;
    this.carregarAlunos();
    this.showFilterModal = false;
  }

  onFilterClose(): void {
    this.showFilterModal = false;
  }
} 