export interface FrequenciaDTO {
    id?: number;
    alunoId: number;
    data: Date;
    presente: boolean;
    observacao?: string;
} 