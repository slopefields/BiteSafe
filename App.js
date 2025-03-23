import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import MainScreen from './screens/MainScreen'
import ConnectingScreen from './screens/RaybanConnecting';
import RaybanResults from './screens/RaybanResults';
import UploadScreen from './screens/UploadScreen';
import CameraResults from './screens/CameraResults';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RaybanConnecting" component={ConnectingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RaybanResults" component={RaybanResults} options={{ headerShown: false }} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UploadResults" component={CameraResults} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}