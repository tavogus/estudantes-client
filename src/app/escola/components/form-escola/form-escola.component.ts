import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EscolaService } from '../../service/escola.service';
import { EscolaDTO } from '../../models/escola-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-escola',
  templateUrl: './form-escola.component.html',
  styleUrls: ['./form-escola.component.scss'],
  standalone: false 
})
export class FormEscolaComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  escolaId?: number;

  constructor(
    private fb: FormBuilder,
    private escolaService: EscolaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      endereco: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.escolaId = this.route.snapshot.params['id'];
    if (this.escolaId) {
      this.isEdit = true;
      this.carregarEscola();
    }
  }

  carregarEscola(): void {
    if (this.escolaId) {
      this.escolaService.buscarPorId(this.escolaId).subscribe({
        next: (escola) => {
          this.form.patchValue(escola);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao carregar escola'
          });
          this.router.navigate(['/escola']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const escola: EscolaDTO = this.form.value;
      
      if (this.isEdit && this.escolaId) {
        this.escolaService.atualizar(this.escolaId, escola).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Escola atualizada com sucesso'
            });
            this.router.navigate(['/escola']);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Erro ao atualizar escola'
            });
          }
        });
      } else {
        this.escolaService.criar(escola).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Escola criada com sucesso'
            });
            this.router.navigate(['/escola']);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Erro ao criar escola'
            });
          }
        });
      }
    }
  }

  voltar(): void {
    this.router.navigate(['/escola']);
  }
}
