import { TipoBeneficio } from "./tipo-beneficio";

export class AlunoDTO {
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
      id: number
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
  