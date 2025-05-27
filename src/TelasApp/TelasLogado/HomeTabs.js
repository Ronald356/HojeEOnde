// src/TelasApp/TelasLogado/HomeLogadoTabs.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeLogado from './homeLogado';
import Icon from 'react-native-vector-icons/Ionicons'; // ou use MaterialIcons
import BuscarScreen from './buscar';
import EventoScreen from './Evento';
import PerfilScreen from './Perfil';

const Tab = createBottomTabNavigator();

const TabIcon = ({route, focused, color, size}) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Buscar') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route.name === 'Evento') {
    iconName = focused ? 'calendar' : 'calendar-outline';
  } else if (route.name === 'Perfil') {
    iconName = focused ? 'person' : 'person-outline';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

const HomeLogadoTabs = () => {
  console.warn('HomeLogadoTabs rendered');
  return (
    <Tab.Navigator
      initialRouteName="Evento"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => <TabIcon route={route} {...props} />,
      })}>
      <Tab.Screen name="Home" component={HomeLogado} />
      <Tab.Screen name="Buscar" component={BuscarScreen} />
      <Tab.Screen name="Evento" component={EventoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};

export default HomeLogadoTabs;
