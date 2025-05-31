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
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponenteTextInput from '../../componentes/textInput';
import BotaoFundoColorido from '../../componentes/botaoApp/botaoFundoColorido';
import AcessibilidadeFoco from '../../componentes/acessibilidade/acessibilidadeInfo';
import {
  enviarCodigo,
  enviarCodigoRecuperacao,
  verificarEmailExistente,
  verificarEmailExistenteParaRecuperarSenha,
} from '../../conexoesAPI/chamarAPI';

const TelaEsqueciSenha = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function showToast(message) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  const validarEmail = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setErroEmail('Formato de email inválido');
    } else {
      setErroEmail('');
    }
  };

  const enviarPedidoRecuperacao = async () => {
    if (!email) {
      showToast('Informe o email para recuperação.');
      return;
    }

    if (erroEmail) {
      showToast('Corrija o email antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      const verificaEmail = await verificarEmailExistenteParaRecuperarSenha(
        email,
      );
      if (!verificaEmail.exists) {
        showToast('Email não encontrado.');
        return;
      }

      navigation.navigate('TelaVerificacaoEsqueciSenha', {email});

      const data = await enviarCodigoRecuperacao(email);
      console.log('Resposta da API:', data);
      showToast('Código de verificação enviado para o e-mail!');
    } catch (error) {
      console.error('Erro ao enviar código:', error);
      showToast('Erro ao enviar o código.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

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
            <AcessibilidadeFoco mensagem="Tela de recuperação de senha. Informe seu e-mail para receber instruções." />

            <Text style={styles.titulo}>Recuperar Senha</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <ComponenteTextInput
                placeholder="email"
                tipo="email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={validarEmail}
                returnKeyType="done"
                onSubmitEditing={enviarPedidoRecuperacao}
              />
              {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}
            </View>
          </View>

          <View style={styles.footer}>
            <BotaoFundoColorido
              text={loading ? 'Enviando...' : 'Enviar'}
              onPress={enviarPedidoRecuperacao}
              disabled={loading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  erro: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    marginBottom: 30,
  },
});

export default TelaEsqueciSenha;
