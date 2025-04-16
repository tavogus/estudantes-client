export interface AlunoDTO {
    id?: number;
    nome: string;
}

export interface FrequenciaDTO {
    id?: number;
    alunoId: number;
    aluno?: AlunoDTO;
    data: Date;
    presente: boolean;
    observacao?: string;
} 