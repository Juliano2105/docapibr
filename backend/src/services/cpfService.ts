import axios from 'axios';
import { env } from '../config/env';

export const queryCpf = async (cpf: string) => {
  try {
    const url = `${env.CPF_API_BASE_URL}/cpf/${cpf}`;
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': env.CPF_API_KEY,
      },
      timeout: 5000,
    });
    
    // Normalization matching the exact API response for DashboardSearch mapping
    const payload = response.data.data;
    
    return {
      CPF: payload.CPF || cpf,
      NOME: payload.NOME || '',
      SEXO: payload.SEXO || '',
      NASC: payload.NASC || '',
      NOME_MAE: payload.NOME_MAE || '',
    };
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      throw { code: 'NOT_FOUND', message: 'CPF nao encontrado.', httpStatus: 404 };
    }
    throw { code: 'SERVICE_UNAVAILABLE', message: 'Servico de consulta indisponivel.', httpStatus: 503 };
  }
};
