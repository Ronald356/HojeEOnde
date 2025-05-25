import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Animated,
} from 'react-native';
import COR from '../../constants/cor';
import BotaoFundoColorido from '../botaoApp/botaoFundoColorido';
import {validarAPI} from '../../conexoesAPI/chamarAPI';
import ModalPersonalizado from '../modalAlerta';

const TelaVerificacao = ({navigation, route}) => {
  const {email} = route.params;
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [tempo, setTempo] = useState(60);
  const inputs = useRef([]);
  const [alerta, setAlerta] = useState(false);

  // 1. Animated value para shake
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tempo === 0) {
      return;
    }
    const timer = setInterval(() => {
      setTempo(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [tempo]);

  const handleChangeText = (text, index) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const novoCodigo = [...codigo];
      novoCodigo[index] = text;
      setCodigo(novoCodigo);

      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
      if (!text && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  // 2. Função para animar o shake
  const animarShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinuar = async () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6) {
      setAlerta({
        titulo: 'Atenção',
        mensagem: 'Por favor, insira o código completo.',
        aoFechar: () => setAlerta(false),
        textoConfirmar: 'Ok',
        aoConfirmar: () => setAlerta(false),
      });
      return;
    }

    const resultado = await validarAPI({
      url: 'https://9a09-2804-14c-5bb8-8ac5-ddd2-7963-277b-f5d7.ngrok-free.app/auth/validar-codigo',
      body: {email, codigo: codigoCompleto},
      onSuccessNavigate: {
        name: 'Senha',
        params: {email, codigo: codigoCompleto},
      },
      onErrorMessage: 'Código inválido ou expirado',
      navigation,
    });

    if (!resultado) {
      animarShake();
    }
  };

  const reenviarCodigo = async () => {
    try {
      const response = await validarAPI({
        url: 'https://9a09-2804-14c-5bb8-8ac5-ddd2-7963-277b-f5d7.ngrok-free.app/auth/validar-codigo',
        body: {email},
      });

      if (!response.ok) {
        throw new Error(
          'Erro ao enviar o código. Verifique o e-mail e tente novamente.',
        );
      }

      setTempo(60);
    } catch (error) {
      console.error('Erro ao enviar código:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>{'< Voltar'}</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Digite o código de 6 dígitos</Text>
      <Text style={styles.subtitulo}>que enviamos para</Text>
      <Text style={styles.email}>{email}</Text>

      {/* 3. Aplicar a animação no container dos inputs */}
      <Animated.View
        style={[
          styles.codigoContainer,
          {transform: [{translateX: shakeAnim}]},
        ]}>
        {codigo.map((valor, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={valor}
            onChangeText={text => handleChangeText(text, index)}
            ref={ref => (inputs.current[index] = ref)}
          />
        ))}
      </Animated.View>

      {tempo > 0 ? (
        <Text style={[styles.temporizador, {color: 'gray'}]}>
          Para reenviar o código, espere 0:{tempo < 10 ? `0${tempo}` : tempo}
        </Text>
      ) : (
        <Pressable onPress={reenviarCodigo}>
          <Text
            style={[
              styles.temporizador,
              {color: COR.primaria, textDecorationLine: 'underline'},
            ]}>
            Você pode reenviar o código agora.
          </Text>
        </Pressable>
      )}

      <BotaoFundoColorido text={'Continuar'} onPress={handleContinuar} />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  voltar: {
    fontSize: 16,
    marginBottom: 20,
    color: COR.preto,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    marginTop: 10,
  },
  email: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  codigoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    width: 40,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
  },
  temporizador: {
    textAlign: 'center',
    marginBottom: 20,
  },
  botao: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoAtivo: {
    backgroundColor: 'red',
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TelaVerificacao;
