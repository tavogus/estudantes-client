import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlunoService } from '../../service/aluno.service';
import { AlunoDTO } from '../../models/aluno-dto';
import { TipoBeneficio } from '../../models/tipo-beneficio';
import { Router, RouterModule } from '@angular/router';
import { EscolaService } from '../../../escola/service/escola.service';
import { EscolaDTO } from '../../../escola/models/escola-dto';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-aluno',
  templateUrl: './form-aluno.component.html',
  styleUrl: './form-aluno.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSelectModule,
    HttpClientModule
  ],
  providers: [
    AlunoService,
    EscolaService
  ]
})
export class FormAlunoComponent implements OnInit {
  alunoForm: FormGroup;
  tiposBeneficio = Object.values(TipoBeneficio);
  isEditMode = false;
  alunoId: number | null = null;
  escolas: EscolaDTO[] = [];
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private escolaService: EscolaService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      tipoBeneficio: ['', Validators.required],
      escola: ['', Validators.required],
      alerta: [false]
    });
  }

  ngOnInit(): void {
    this.carregarEscolas();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.alunoId = Number(id);
      this.alunoService.getById(this.alunoId).subscribe({
        next: (aluno) => {
          this.alunoForm.patchValue({
            ...aluno,
            escola: this.escolas.find(e => e.id === aluno.escolaId)
          });
        },
        error: (error) => {
          console.error('Erro ao carregar aluno:', error);
          this.showNotificationMessage('Erro ao carregar aluno', 'error');
        }
      });
    }
  }

  carregarEscolas(): void {
    this.escolaService.listar().subscribe({
      next: (escolas) => {
        this.escolas = escolas;
      },
      error: (error) => {
        console.error('Erro ao carregar escolas:', error);
        this.showNotificationMessage('Erro ao carregar escolas', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.alunoForm.valid) {
      const alunoData = this.alunoForm.value;
      const aluno = new AlunoDTO(
        alunoData.nome,
        alunoData.cpf,
        new Date(alunoData.dataNascimento),
        alunoData.endereco,
        alunoData.telefone,
        alunoData.tipoBeneficio,
        alunoData.escola,
        alunoData.alerta,
        this.alunoId || 0
      );

      console.log(alunoData);

      if (this.isEditMode && this.alunoId) {
        this.alunoService.update(this.alunoId, aluno).subscribe({
          next: () => {
            this.showNotificationMessage('Aluno atualizado com sucesso!', 'success');
            setTimeout(() => this.router.navigate(['/alunos']), 2000);
          },
          error: (error) => {
            console.error('Erro ao atualizar aluno:', error);
            this.showNotificationMessage('Erro ao atualizar aluno', 'error');
          }
        });
      } else {
        this.alunoService.create(aluno).subscribe({
          next: () => {
            this.showNotificationMessage('Aluno criado com sucesso!', 'success');
            setTimeout(() => this.router.navigate(['/alunos']), 2000);
          },
          error: (error) => {
            console.error('Erro ao criar aluno:', error);
            this.showNotificationMessage('Erro ao criar aluno', 'error');
          }
        });
      }
    }
  }

  private showNotificationMessage(message: string, type: 'success' | 'error'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
} 