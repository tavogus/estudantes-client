import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FrequenciaService } from '../../service/frequencia.service';
import { FrequenciaDTO } from '../../models/frequencia-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-frequencia',
  templateUrl: './list-frequencia.component.html',
  styleUrls: ['./list-frequencia.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListFrequenciaComponent implements OnInit {
  frequencias: FrequenciaDTO[] = [];
  loading = true;
  alunoId: number;

  constructor(
    private frequenciaService: FrequenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.alunoId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.carregarFrequencias();
  }

  carregarFrequencias(): void {
    this.loading = true;
    this.frequenciaService.listarPorAluno(this.alunoId).subscribe({
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

  novaFrequencia(): void {
    this.router.navigate(['/alunos/frequencia', this.alunoId]);
  }

  voltar(): void {
    this.router.navigate(['/alunos/escola', this.route.snapshot.queryParams['escolaId']]);
  }
} 