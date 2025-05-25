import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/TelasApp/Home';
import COR from './src/constants/cor';
import TelaEmail from './src/componentes/criarConta/telaEmail';
import TelaVerificacao from './src/componentes/criarConta/telaVerificacao';
import TelaSenha from './src/componentes/criarConta/telaSenha';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COR.verdeLogo}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Email" component={TelaEmail} />
        <Stack.Screen name="Verificacao" component={TelaVerificacao} />
        <Stack.Screen name="Senha" component={TelaSenha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
