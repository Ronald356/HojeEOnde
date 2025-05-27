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
import {
  enviarCodigo,
  verificarEmailExistente,
} from '../../conexoesAPI/chamarAPI';

const TelaEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState(false);

  function showToast(message) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  async function checarEmail() {
    try {
      const resultado = await verificarEmailExistente(email);
      if (resultado.exists) {
        console.log('Email já cadastrado!');
      } else {
        console.log('Email disponível.');
      }
    } catch (err) {
      console.error('Erro ao verificar email:', err);
    }
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

    const verificaEmail = await verificarEmailExistente(email);
    if (verificaEmail.exists) {
      return showToast('Email já cadastrado!');
    } else {
      console.log('Email disponível.');
      navigation.navigate('Verificacao', {email});
    }

    try {
      const data = await enviarCodigo(email);
      console.log('Resposta da API:', data);
      showToast('Código de verificação enviado para o e-mail!');
    } catch (error) {
      console.error('Erro ao enviar código:', error);
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
            <AcessibilidadeFoco mensagem="Tela de login. Informe seu e-mail para continuar." />

            <Text style={styles.titulo}>Qual o seu e-mail?</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <ComponenteTextInput
                placeholder="E-mail"
                tipo={'email'}
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                estiloInput={{width: '1000%', border: 10}}
                onChangeText={setEmail}
              />
            </View>
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

export default TelaEmail;
