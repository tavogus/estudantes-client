import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlunoService } from '../../service/aluno.service';
import { Aluno } from '../../models/aluno-dto';
import { TipoBeneficio } from '../../models/tipo-beneficio';
import { Router, RouterModule } from '@angular/router';
import { EscolaService } from '../../../escola/service/escola.service';
import { EscolaDTO } from '../../../escola/models/escola-dto';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';

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
  form: FormGroup;
  tiposBeneficio = Object.values(TipoBeneficio);
  isEditMode = false;
  alunoId: number | null = null;
  escolas: EscolaDTO[] = [];
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private escolaService: EscolaService,
    private route: ActivatedRoute,
    public router: Router,
    private notificationService: NotificationService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      tipoBeneficio: ['', [Validators.required]],
      escolaId: ['', [Validators.required]],
      alerta: [false]
    });
  }

  ngOnInit(): void {
    this.carregarEscolas();
    
    this.alunoId = this.route.snapshot.params['id'];
    if (this.alunoId) {
      this.isEditMode = true;
      this.carregarAluno();
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

  carregarAluno(): void {
    this.alunoService.buscarPorId(this.alunoId!).subscribe({
      next: (aluno) => {
        this.form.patchValue(aluno);
      },
      error: (error) => {
        this.notificationService.error('Erro', 'Não foi possível carregar os dados do aluno');
        console.error('Erro ao carregar aluno:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const aluno = new Aluno(
        this.form.value.nome,
        this.form.value.cpf,
        this.form.value.dataNascimento,
        this.form.value.endereco,
        this.form.value.telefone,
        this.form.value.tipoBeneficio,
        this.form.value.escolaId,
        this.form.value.alerta,
        this.alunoId || 0
      );

      const observable = this.alunoId
        ? this.alunoService.atualizar(this.alunoId, aluno)
        : this.alunoService.criar(aluno);

      observable.subscribe({
        next: () => {
          this.notificationService.success(
            'Sucesso',
            `Aluno ${this.alunoId ? 'atualizado' : 'criado'} com sucesso!`
          );
          this.router.navigate(['/alunos']);
        },
        error: (error) => {
          this.notificationService.error(
            'Erro',
            `Não foi possível ${this.alunoId ? 'atualizar' : 'criar'} o aluno`
          );
          console.error('Erro ao salvar aluno:', error);
        }
      });
    } else {
      this.notificationService.warning(
        'Atenção',
        'Por favor, preencha todos os campos obrigatórios corretamente'
      );
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