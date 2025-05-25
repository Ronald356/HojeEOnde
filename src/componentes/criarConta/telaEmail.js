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

  const handleProximo = () => {
    if (!email) {
      showToast('Informe um email válido.');
      return;
    }

    // Dispara a requisição, mas não espera
    fetch(
      'https://9a09-2804-14c-5bb8-8ac5-ddd2-7963-277b-f5d7.ngrok-free.app/auth/enviar-codigo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      },
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(
            'Erro ao enviar o código. Verifique o e-mail e tente novamente.',
          );
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta da API:', data);
        showToast('Código de verificação enviado para o e-mail!');
      })
      .catch(error => {
        console.error('Erro ao enviar código:', error);
        showToast(error.message || 'Erro inesperado. Tente novamente.');
      });

    // Navega imediatamente, sem esperar a resposta
    navigation.navigate('Verificacao', {email});
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
