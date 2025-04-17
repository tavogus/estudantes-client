import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrequenciaService } from '../../service/frequencia.service';
import { FrequenciaDTO, AlunoDTO } from '../../models/frequencia-dto';
import { FilterModalComponent } from '../../../shared/components/filter-modal/filter-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-frequencia-periodo',
  templateUrl: './list-frequencia-periodo.component.html',
  styleUrls: ['./list-frequencia-periodo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FilterModalComponent]
})
export class ListFrequenciaPeriodoComponent implements OnInit {
  frequencias: FrequenciaDTO[] = [];
  alunos: AlunoDTO[] = [];
  loading = true;
  showFilterModal = false;
  filters = {
    alunoId: null as number | null,
    dataInicio: '',
    dataFim: ''
  };

  constructor(private frequenciaService: FrequenciaService) {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    this.filters.dataInicio = primeiroDiaMes.toISOString().split('T')[0];
    this.filters.dataFim = hoje.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.carregarAlunos();
    this.carregarFrequencias();
  }

  carregarAlunos(): void {
    this.frequenciaService.listarAlunos().subscribe({
      next: (alunos: AlunoDTO[]) => {
        this.alunos = alunos;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar lista de alunos'
        });
      }
    });
  }

  carregarFrequencias(): void {
    this.loading = true;
    this.frequenciaService.buscarFrequenciasPorPeriodo(
      this.filters.alunoId,
      this.filters.dataInicio,
      this.filters.dataFim
    ).subscribe({
      next: (frequencias: FrequenciaDTO[]) => {
        this.frequencias = frequencias;
        this.loading = false;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar frequências'
        });
        this.loading = false;
      }
    });
  }

  onFilterApply(filters: any): void {
    this.filters = filters;
    this.showFilterModal = false;
    this.carregarFrequencias();
  }

  onFilterClose(): void {
    this.showFilterModal = false;
  }
} 