import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import ImagemApp from '../imagem';
import BotaoApp from '../botao';
import BotaoFundoColorido from '../botaoApp/botaoFundoColorido';
import BotaoBordaColorida from '../botaoApp/botaoBordaColorida';
import Titulo from '../textTitulo';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Ionicons from '../../constants/Ionicons';
import Icone from 'react-native-vector-icons/Ionicons';
import COR from '../../constants/cor';
import GoogleLogin from '../logarCom/logarComGoogle';
import FacebookLogin from '../logarCom/logarComFacebook';
import AcessibilidadeFoco from '../acessibilidade/acessibilidadeInfo';

const {height} = Dimensions.get('window');

export default function ModalAnimado({visible, onClose}) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const navigation = useNavigation();
  const [contadorToque, setContadorToque] = useState(0);

  const handlePress = () => {
    setContadorToque(prev => {
      const novoValor = prev + 1;
      if (novoValor >= 5) {
        // Ação ao clicar 5 vezes
        navigation.navigate('HomeLogadoTabs');
      }
      return novoValor;
    });
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const criarConta = () => {
    navigation.navigate('Email');
  };

  const logarNaConta = () => {
    navigation.navigate('Login');
  };

  const entrarApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'HomeLogadoTabs'}],
      }),
    );
  };

  return (
    <Pressable onPress={handlePress}>
      <View>
        <ImagemApp
          nomeImagem="logostory"
          style={{width: '100%', height: '100%', bottom: 50}}
        />

        <Modal
          transparent
          visible={true}
          animationType="none"
          onRequestClose={onClose}>
          <Pressable style={styles.overlay} onPress={onClose} />

          <Animated.View
            style={[
              styles.container,
              {
                transform: [{translateY: slideAnim}],
              },
            ]}>
            <View style={{marginTop: 10}}>
              <AcessibilidadeFoco mensagem="Bem-vindo ao Hoje é Onde! Aqui você pode entrar com sua conta existente ou criar uma nova conta para começar a usar o aplicativo." />

              <BotaoFundoColorido
                text={'Logar na minha conta'}
                onPress={logarNaConta}
              />
              <BotaoBordaColorida text={'Criar conta'} onPress={criarConta} />
            </View>

            <Text style={styles.subtitle}>Acessar com</Text>

            <View style={styles.socialButtonsContainer}>
              <GoogleLogin />
              <FacebookLogin />
            </View>
          </Animated.View>
        </Modal>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
