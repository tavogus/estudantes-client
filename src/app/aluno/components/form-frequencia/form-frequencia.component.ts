import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FrequenciaService } from '../../service/frequencia.service';
import { FrequenciaDTO } from '../../models/frequencia-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-frequencia',
  templateUrl: './form-frequencia.component.html',
  styleUrls: ['./form-frequencia.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FormFrequenciaComponent implements OnInit {
  frequencia: FrequenciaDTO = {
    id: undefined,
    alunoId: 0,
    data: new Date(),
    presente: true,
    observacao: ''
  };
  loading: boolean = false;

  constructor(
    private frequenciaService: FrequenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const alunoId = this.route.snapshot.params['id'];
    if (alunoId) {
      this.frequencia.alunoId = alunoId;
    }
  }

  salvar(): void {
    this.loading = true;
    this.frequenciaService.criar(this.frequencia).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Frequência registrada com sucesso'
        });
        this.router.navigate(['/alunos/frequencias', this.frequencia.alunoId]);
      },
      error: (error: Error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao registrar frequência'
        });
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/alunos/frequencias', this.frequencia.alunoId]);
  }
} 