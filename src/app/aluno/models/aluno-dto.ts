import { TipoBeneficio } from "./tipo-beneficio";

/**
 * Interface que representa um aluno no sistema
 */
export interface AlunoDTO {
  /** Identificador único do aluno */
  id: number;
  
  /** Nome completo do aluno */
  nome: string;
  
  /** CPF do aluno */
  cpf: string;
  
  /** Data de nascimento do aluno */
  dataNascimento: Date;
  
  /** Endereço completo do aluno */
  endereco: string;
  
  /** Telefone para contato */
  telefone: string;
  
  /** Tipo de benefício do aluno */
  tipoBeneficio: TipoBeneficio;
  
  /** Identificador da escola do aluno */
  escolaId: number;
  
  /** Indica se o aluno possui alerta */
  alerta: boolean;
}

/**
 * Classe que implementa a interface AlunoDTO
 */
export class Aluno implements AlunoDTO {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  endereco: string;
  telefone: string;
  tipoBeneficio: TipoBeneficio;
  escolaId: number;
  alerta: boolean;

  constructor(
    nome: string,
    cpf: string,
    dataNascimento: Date,
    endereco: string,
    telefone: string,
    tipoBeneficio: TipoBeneficio,
    escolaId: number,
    alerta: boolean,
    id: number = 0
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.telefone = telefone;
    this.tipoBeneficio = tipoBeneficio;
    this.escolaId = escolaId;
    this.alerta = alerta;
    this.id = id;
  }
}
  