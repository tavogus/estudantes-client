/**
 * Interface que representa uma escola no sistema
 */
export interface EscolaDTO {
  /** Identificador único da escola */
  id: number;
  
  /** Nome da escola */
  nome: string;
  
  /** Endereço completo da escola */
  endereco: string;
  
  /** Número de telefone para contato */
  telefone: string;
}
  