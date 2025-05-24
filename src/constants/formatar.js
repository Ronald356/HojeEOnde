// src/utils/formatadores.js

import dayjs from 'dayjs';

// --- Datas ---

export const formatarData = (data, comHora = false) => {
  if (!data) return '';
  const d = dayjs(data);
  if (!d.isValid()) return '';
  return comHora
    ? d.format('DD/MM/YYYY HH:mm')
    : d.format('DD/MM/YYYY');
};


// --- Números ---

export const formatarNumero = (numero, casasDecimais = 2) => {
  if (numero == null || isNaN(numero)) return '';
  return Number(numero).toLocaleString('pt-BR', {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
};

export const formatarMoeda = (valor) => {
  if (valor == null || isNaN(valor)) return '';
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatarPorcentagem = (valor, casasDecimais = 2) => {
  if (valor == null || isNaN(valor)) return '';
  return (Number(valor) * 100).toFixed(casasDecimais) + '%';
};

// --- Strings ---

export const capitalizar = (texto) => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

export const capitalizarPalavras = (texto) => {
  if (!texto) return '';
  return texto
    .split(' ')
    .map(palavra => capitalizar(palavra))
    .join(' ');
};

export const truncar = (texto, tamanhoMaximo = 100) => {
  if (!texto) return '';
  if (texto.length <= tamanhoMaximo) return texto;
  return texto.slice(0, tamanhoMaximo) + '...';
};

export const limparEspacos = (texto) => {
  if (!texto) return '';
  return texto.trim().replace(/\s+/g, ' ');
};

export const formatarTelefone = (telefone) => {
  if (!telefone) return '';
  const limpo = telefone.replace(/\D/g, '');
  const regex = /^(\d{2})(\d{4,5})(\d{4})$/;
  const resultado = limpo.match(regex);
  if (resultado) {
    return `(${resultado[1]}) ${resultado[2]}-${resultado[3]}`;
  }
  return telefone;
};

export const formatarCPF = (cpf) => {
  if (!cpf) return '';
  const limpo = cpf.replace(/\D/g, '');
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  const resultado = limpo.match(regex);
  if (resultado) {
    return `${resultado[1]}.${resultado[2]}.${resultado[3]}-${resultado[4]}`;
  }
  return cpf;
};

// --- CamelCase ---

export const paraCamelCase = (texto) => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

