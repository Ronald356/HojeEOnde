import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export function salvarToken(token) {
  storage.set('token', token);
}

export function obterToken() {
  return storage.getString('token');
}

export function apagarToken() {
  storage.delete('token');
}

// Funções para o email

export function salvarEmail(email) {
  storage.set('email', email);
}

export function obterEmail() {
  return storage.getString('email');
}

export function apagarEmail() {
  storage.delete('email');
}

export function salvarSenha(senha) {
  storage.set('senha', senha);
}

export const obterSenha = () => {
  return storage.getString('senha');
};

export function salvarFotoPerfil(uri) {
  storage.set('fotoPerfil', uri);
}

export function obterFotoPerfil() {
  return storage.getString('fotoPerfil');
}

export function apagarFotoPerfil() {
  storage.delete('fotoPerfil');
}
