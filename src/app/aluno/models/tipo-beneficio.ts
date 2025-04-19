/**
 * Enum que representa os tipos de benefício disponíveis para os alunos
 */
export enum TipoBeneficio {
  /** Aluno de baixa renda */
  BAIXA_RENDA = 'BAIXA_RENDA',
  
  /** Aluno bolsista */
  BOLSISTA = 'BOLSISTA'
}

/**
 * Função auxiliar para obter a descrição amigável do tipo de benefício
 */
export function getTipoBeneficioDescricao(tipo: TipoBeneficio): string {
  switch (tipo) {
    case TipoBeneficio.BAIXA_RENDA:
      return 'Baixa Renda';
    case TipoBeneficio.BOLSISTA:
      return 'Bolsista';
    default:
      return 'Desconhecido';
  }
}
  