import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EscolaService } from '../../service/escola.service';
import { EscolaDTO } from '../../models/escola-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-escola',
  templateUrl: './list-escola.component.html',
  styleUrls: ['./list-escola.component.scss'],
  standalone: false
})
export class ListEscolaComponent implements OnInit {
  escolas: EscolaDTO[] = [];
  loading: boolean = true;

  constructor(
    private escolaService: EscolaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEscolas();
  }

  carregarEscolas(): void {
    this.loading = true;
    this.escolaService.listar().subscribe({
      next: (escolas) => {
        this.escolas = escolas;
        this.loading = false;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar escolas'
        });
        this.loading = false;
      }
    });
  }

  novaEscola(): void {
    this.router.navigate(['/escola/nova']);
  }

  editarEscola(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/escola/editar', id]);
    }
  }

  confirmarExclusao(id: number): void {
    if (id) {
      Swal.fire({
        title: 'Tem certeza?',
        text: "Esta ação não pode ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirEscola(id);
        }
      });
    }
  }

  excluirEscola(id: number | undefined): void {
    if (id) {
      this.escolaService.excluir(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Escola excluída com sucesso'
          });
          this.carregarEscolas();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao excluir escola'
          });
        }
      });
    }
  }
}
