import {ToastAndroid} from 'react-native';
import {pegarApiUrl} from './pegarUrlApi';

let baseUrl = null;

async function getBaseUrl() {
  if (baseUrl) {
    return baseUrl;
  }

  baseUrl = await pegarApiUrl();
  if (!baseUrl) {
    throw new Error('Não foi possível obter a URL da API');
  }
  return baseUrl;
}

function showToast(message) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
}

async function validarCodigo(email, codigo) {
  try {
    const url = await getBaseUrl();
    const endpoint = `${url}/auth/validar-codigo`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, codigo}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Código inválido ou expirado.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(error.message || 'Erro ao validar código.');
    throw error;
  }
}

async function enviarCodigo(email) {
  try {
    const url = await getBaseUrl();
    const endpoint = `${url}/auth/enviar-codigo`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao enviar o código.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(error.message || 'Erro inesperado ao enviar código.');
    throw error;
  }
}

async function criarConta(nome, email, senha) {
  try {
    const url = await getBaseUrl();
    const endpoint = `${url}/auth/register`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome, email, senha}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao criar conta.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(error.message || 'Erro inesperado ao criar conta.');
    throw error;
  }
}

async function verificarEmailExistente(email) {
  try {
    const url = await getBaseUrl();
    // O endpoint precisa do email na query string
    const endpoint = `${url}/auth/verificarEmailExistente?email=${encodeURIComponent(
      email,
    )}`;

    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao verificar email.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(error.message || 'Erro inesperado ao verificar email.');
    throw error;
  }
}

async function verificarEventosDeBH() {
  try {
    const url = await getBaseUrl();
    // O endpoint precisa do email na query string
    const endpoint = `${url}/auth/eventos`;

    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao verificar email.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(error.message || 'Erro inesperado ao verificar email.');
    throw error;
  }
}

async function detalharEvento(urlEvento) {
  try {
    const url = await getBaseUrl();
    const endpoint = `${url}/auth/detalhe?url=${encodeURIComponent(urlEvento)}`;

    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao detalhar evento.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(error.message || 'Erro inesperado ao detalhar evento.');
    throw error;
  }
}

export {
  validarCodigo,
  enviarCodigo,
  criarConta,
  verificarEmailExistente,
  verificarEventosDeBH,
  detalharEvento,
};
