import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrequenciaService } from '../../service/frequencia.service';
import { FrequenciaDTO } from '../../models/frequencia-dto';
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
  loading = true;
  dataInicio: string;
  dataFim: string;
  alunoId: number;

  constructor(
    private frequenciaService: FrequenciaService,
    private route: ActivatedRoute
  ) {
    this.alunoId = Number(this.route.snapshot.paramMap.get('id'));
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    this.dataInicio = primeiroDiaMes.toISOString().split('T')[0];
    this.dataFim = hoje.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.carregarFrequencias();
  }

  carregarFrequencias(): void {
    this.loading = true;
    this.frequenciaService.buscarFrequenciasPorPeriodo(this.alunoId, this.dataInicio, this.dataFim).subscribe({
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
} 