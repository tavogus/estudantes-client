import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  /**
   * Valida um CPF
   * @param cpf CPF a ser validado
   * @returns true se o CPF for válido, false caso contrário
   */
  validarCPF(cpf: string): boolean {
    if (!cpf) return false;
    
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  }

  /**
   * Formata um CPF
   * @param cpf CPF a ser formatado
   * @returns CPF formatado
   */
  formatarCPF(cpf: string): string {
    if (!cpf) return '';
    
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Formata o CPF
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  /**
   * Valida um número de telefone
   * @param telefone Telefone a ser validado
   * @returns true se o telefone for válido, false caso contrário
   */
  validarTelefone(telefone: string): boolean {
    if (!telefone) return false;
    
    // Remove caracteres não numéricos
    telefone = telefone.replace(/[^\d]/g, '');
    
    // Verifica se tem entre 10 e 11 dígitos
    return telefone.length >= 10 && telefone.length <= 11;
  }

  /**
   * Formata um número de telefone
   * @param telefone Telefone a ser formatado
   * @returns Telefone formatado
   */
  formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    
    // Remove caracteres não numéricos
    telefone = telefone.replace(/[^\d]/g, '');
    
    // Formata o telefone
    if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
  }
} 