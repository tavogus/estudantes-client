import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../service/aluno.service';
import { AlunoDTO } from '../../models/aluno-dto';
import { CommonModule } from '@angular/common';
import { FilterModalComponent } from '../../../shared/components/filter-modal/filter-modal.component';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar alunos'
        });
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

  registrarFrequencia(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/alunos/frequencias', id], {
        queryParams: { escolaId: this.escolaId }
      });
    }
  }

  confirmarExclusao(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.excluirAluno(id);
      }
    });
  }

  excluirAluno(id: number | undefined): void {
    if (id) {
      this.alunoService.excluir(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Aluno excluído com sucesso'
          });
          this.carregarAlunos();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao excluir aluno'
          });
        }
      });
    }
  }

  onFilterApply(filters: any): void {
    this.filters = filters;
    this.showFilterModal = false;
    this.carregarAlunos();
  }

  onFilterClose(): void {
    this.showFilterModal = false;
  }
} 