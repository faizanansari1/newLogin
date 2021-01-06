import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/component/Login';
import Dashboard from './src/component/Dashboard';
import AboutScreen from './src/component/About';
import FriendList from './src/component/Friend';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={ConfigureStore()}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Friend" component={FriendList} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}








