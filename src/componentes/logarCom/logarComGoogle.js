import React, { useEffect } from 'react';
import { View, Button, Alert, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Ionicons from '../../constants/Ionicons';
import Icone from 'react-native-vector-icons/Ionicons';
import COR from '../../constants/cor';

export default function GoogleLogin() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1012671298390-gg9undi9l4n8co9nk1f6e085tlfh3rea.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  async function handleGoogleLogin() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      const response = await fetch('https://9a09-2804-14c-5bb8-8ac5-ddd2-7963-277b-f5d7.ngrok-free.app/auth/loginComGoogle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();
        console.log(data);
      if (data.token) {
        Alert.alert('Login sucesso', 'Token JWT: ' + data.token);
        // Salvar token e navegar
      } else {
        Alert.alert('Erro', 'Falha no login com Google');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login em andamento');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services não disponível');
      } else {
        console.log('entrou');
        console.warn('Erro desconhecido', error.message);
      }
    }
  }

  return (
    <TouchableOpacity onPress={handleGoogleLogin}>
     <Icone name={Ionicons.iconeGoogle} size={35} color={COR.vermelhoClaro}/>
    </TouchableOpacity>
  );
}
