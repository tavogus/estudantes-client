import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrequenciaService } from '../../service/frequencia.service';
import { FrequenciaDTO, AlunoDTO } from '../../models/frequencia-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-frequencia-periodo',
  templateUrl: './list-frequencia-periodo.component.html',
  styleUrls: ['./list-frequencia-periodo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListFrequenciaPeriodoComponent implements OnInit {
  frequencias: FrequenciaDTO[] = [];
  alunos: AlunoDTO[] = [];
  loading = true;
  dataInicio: string;
  dataFim: string;
  alunoSelecionado: number | null = null;

  constructor(private frequenciaService: FrequenciaService) {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    this.dataInicio = primeiroDiaMes.toISOString().split('T')[0];
    this.dataFim = hoje.toISOString().split('T')[0];
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
    this.frequenciaService.buscarFrequenciasPorPeriodo(this.alunoSelecionado, this.dataInicio, this.dataFim).subscribe({
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

  onPeriodoChange(): void {
    this.carregarFrequencias();
  }

  onAlunoChange(): void {
    this.carregarFrequencias();
  }
} 