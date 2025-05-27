import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponenteTextInput from '../textInput';
import BotaoFundoColorido from '../botaoApp/botaoFundoColorido';
import ModalPersonalizado from '../modalAlerta';
import AcessibilidadeFoco from '../acessibilidade/acessibilidadeInfo';
import {criaConta, criarConta, enviarCodigo} from '../../conexoesAPI/chamarAPI';

const TelaSenha = ({route, navigation}) => {
  const {email} = route.params;
  const [alerta, setAlerta] = useState(false);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  function showToast(message) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  const handleProximo = async () => {
    if (!email) {
      showToast('Informe um email válido.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Formato de email inválido.');
      return;
    }

    try {
      const data = await criarConta(nome, email, senha);
      console.log('Resposta da API:', data);
      navigation.navigate('HomeLogado');
      showToast('Código de verificação enviado para o e-mail!');
    } catch (error) {
      console.error('Erro ao enviar código:', error);
    }
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  function validarSenha(text) {
    setSenha(text);

    // Exemplo simples de validação de senha fraca:
    // Aqui você pode criar regras mais complexas conforme quiser
    if (text.length < 6) {
      setErroSenha('Senha deve ter pelo menos 6 caracteres');
    } else if (!/[A-Z]/.test(text)) {
      setErroSenha('Senha deve conter ao menos uma letra maiúscula');
    } else if (!/[0-9]/.test(text)) {
      setErroSenha('Senha deve conter ao menos um número');
    } else {
      setErroSenha('');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.voltar} onPress={handleVoltar}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.conteudo}>
            <AcessibilidadeFoco mensagem="Tela de login. Informe seu e-mail para continuar." />

            <Text style={styles.titulo}>Informe a sua senha e seu nome</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <ComponenteTextInput
                placeholder="nome"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={nome}
                estiloInput={{width: '100%', border: 10}}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <ComponenteTextInput
                placeholder="Senha"
                tipo={'senha'}
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={senha}
                onChangeText={validarSenha}
              />
            </View>
            {erroSenha ? (
              <Text style={styles.erroSenha}>{erroSenha}</Text>
            ) : null}
          </View>

          <View style={styles.footer}>
            <Text style={styles.observacao}>
              O app poderá enviar comunicações neste e-mail, pra cancelar a
              inscrição acesse "Configurações".
            </Text>
            <BotaoFundoColorido text={'Continuar'} onPress={handleProximo} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {alerta && (
        <ModalPersonalizado
          visivel={!!alerta}
          titulo={alerta.titulo}
          mensagem={alerta.mensagem}
          textoConfirmar={alerta.textoConfirmar || 'Confirmar'}
          textoCancelar={alerta.textoCancelar || 'Cancelar'}
          aoFechar={alerta.aoFechar}
          aoConfirmar={alerta.aoConfirmar}
          aoCancelar={alerta.aoCancelar}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  voltar: {
    marginTop: 20,
    marginBottom: 20,
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },

  observacao: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default TelaSenha;
