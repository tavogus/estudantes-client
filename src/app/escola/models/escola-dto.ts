export class EscolaDTO {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
  
    constructor(nome: string, endereco: string, telefone: string, id: number) {
      this.nome = nome;
      this.endereco = endereco;
      this.telefone = telefone;
      this.id = id;
    }
  }
  