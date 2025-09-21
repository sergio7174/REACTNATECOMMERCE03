// file: App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from 'react';;
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import { auth } from './src/firebase/firebaseConfig'; // Assuming you have your firebase config set up 

/*** Routes for isAuthenticated users */

//import HomeScreen from './src/components/HomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetails from './src/components/products/ProductDetails';
import Wishlist from './src/screens/Wishlist';
import Cart from './src/screens/Cart';
//import OrderScreen from './src/screens/OrderScreen';


const Stack = createNativeStackNavigator();


 function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);


    return (
     
        

     <Stack.Navigator>
      {!isAuthenticated && (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </>
      )}
      {isAuthenticated && (
        <>

          <Stack.Screen 
             name="Dashboard" 
             component={BottomTabNavigation} 
             options={{ headerShown: false }}/>
          <Stack.Screen
             name="ProductDetails"
             component={ProductDetails}
             options={{ headerShown: false }}/>
          <Stack.Screen
             name="Cart"
             component={Cart}
             options={{ headerShown: false }}/>
          <Stack.Screen
             name="Wishlist"
             component={Wishlist}
             options={{ headerShown: false }}/>
        </>
      )}  

    </Stack.Navigator>

   
    );


}

export default function AppContainer() {
  const [fontsLoaded] = useFonts({
    regular: require('./src/assets/fonts/Poppins-Regular.ttf'),
    light: require('./src/assets/fonts/Poppins-Light.ttf'),
    medium: require('./src/assets/fonts/Poppins-Medium.ttf'),
    bold: require('./src/assets/fonts/Poppins-Bold.ttf'),
    extrabold: require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./src/assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

 return (
    <NavigationContainer onReady={onLayoutRootView}>
      <App />
    </NavigationContainer>
  );
 
}
