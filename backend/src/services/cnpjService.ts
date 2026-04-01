import axios from 'axios';
import { env } from '../config/env';

export const queryCnpj = async (cnpj: string) => {
  try {
    const url = `${env.CNPJ_API_BASE_URL}/cnpj/v1/${cnpj}`;
    const response = await axios.get(url, {
      timeout: 5000,
    });
    
    // Normalization to standardized format
    const data = response.data;
    return {
      cnpj: data.cnpj || cnpj,
      razao_social: data.razao_social || '',
      nome_fantasia: data.nome_fantasia || '',
      logradouro: data.logradouro || '',
      numero: data.numero || '',
      complemento: data.complemento || '',
      bairro: data.bairro || '',
      municipio: data.municipio || '',
      uf: data.uf || '',
      cep: data.cep || '',
      telefone: data.ddd_telefone_1 || data.telefone || '',
      cnae_fiscal: data.cnae_fiscal || '',
      situacao_cadastral: data.descricao_situacao_cadastral || '',
    };
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      throw { code: 'NOT_FOUND', message: 'CNPJ nao encontrado.', httpStatus: 404 };
    }
    throw { code: 'SERVICE_UNAVAILABLE', message: 'Servico de consulta indisponivel.', httpStatus: 503 };
  }
};
