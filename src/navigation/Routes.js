import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeLogado from '../TelasApp/TelasLogado/homeLogado';
import TelaEmail from '../componentes/criarConta/telaEmail';
import TelaVerificacao from '../componentes/criarConta/telaVerificacao';
import TelaSenha from '../componentes/criarConta/telaSenha';
import HomeLogadoTabs from '../TelasApp/TelasLogado/HomeTabs'; // Este será seu Tab.Navigator isolado
import TelaLogin from '../componentes/logarNaConta/LoginScreen';
import DetalhesEventoScreen from '../TelasApp/subTelasApp/detalhesEvento';
import COR from '../constants/cor';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeLogado} />
        <Stack.Screen name="Email" component={TelaEmail} />
        <Stack.Screen name="Verificacao" component={TelaVerificacao} />
        <Stack.Screen name="Senha" component={TelaSenha} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="HomeLogadoTabs" component={HomeLogadoTabs} />
        <Stack.Screen
          name="DetalhesEvento"
          component={DetalhesEventoScreen}
          options={({route}) => ({
            headerTitle: route.params?.tituloEvento ?? 'Detalhes do Evento',
            headerShown: true,
            headerStyle: {
              backgroundColor: route.params?.corDominante,
              height: 10,
            },
            headerTintColor: COR.branco,
            headerTitleStyle: {
              color: COR.branco,
              fontSize: 16,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
