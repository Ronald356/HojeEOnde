import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import COR from '../../constants/cor';
import Ionicons from '../../constants/Ionicons';
import Icone from 'react-native-vector-icons/Ionicons';

export default function FacebookLogin() {
  const handleFacebookLogin = async () => {
    try {
      // Envia para seu backend
      const res = await fetch(
        'https://9a09-2804-14c-5bb8-8ac5-ddd2-7963-277b-f5d7.ngrok-free.app/auth/loginComFacebook',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({}),
        },
      );
      const json = await res.json();

      if (json.success) {
        Alert.alert('Login com Facebook bem-sucedido!');
      } else {
        Alert.alert('Erro no backend:', json.message || 'Sem mensagem');
      }
    } catch (error) {
      console.log('Erro geral:', error);
      Alert.alert('Erro inesperado', error.message || 'Sem mensagem');
    }
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={'Login com Facebook'}
      onPress={handleFacebookLogin}
      style={{marginLeft: 15}}>
      <Icone ac name={Ionicons.iconeFacebook} size={35} color={COR.azulMedio} />
    </TouchableOpacity>
  );
}
