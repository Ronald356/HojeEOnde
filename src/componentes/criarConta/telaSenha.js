import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import ComponenteTextInput from '../textInput';

const TelaSenha = ({ route }) => {
  const { email } = route.params;
  const [senha, setSenha] = useState('');

  const handleCriarConta = () => {
    if (senha.length >= 6) {
      // Aqui você chamaria a API para criar a conta com o e-mail e senha
      alert(`Conta criada para ${email}`);
    } else {
      alert('A senha precisa ter pelo menos 6 caracteres.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Crie uma senha para sua conta</Text>
      <ComponenteTextInput
        tipo="senha"
        placeholder="Senha"
        valor={senha}
        aoAlterarTexto={setSenha}
      />
      <Button title="Criar Conta" onPress={handleCriarConta} />
    </View>
  );
};

export default TelaSenha;
