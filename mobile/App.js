import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos nuestras pantallas
import HomeScreen from './screens/HomeScreen';
import ListadoScreen from './screens/ListadoScreen';
import AltaScreen from './screens/AltaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
          <Stack.Screen name="Listado" component={ListadoScreen} options={{ title: 'Listado de Cursos' }} />
          <Stack.Screen name="Alta" component={AltaScreen} options={{ title: 'Alta de Curso' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}