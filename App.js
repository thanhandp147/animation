/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';

import { Provider } from "react-redux";
import store from './Redux/Store';
import ForJest from './screens/ForJest';
import Counter from './screens/ForJest/Counter';
import ListItems from './screens/ForJest/ListItems'
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import DeepLinking from 'react-native-deep-linking';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import HomeScreen from './screens/Home/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

console.disableYellowBox = true;

NfcManager.start();

const Stack = createNativeStackNavigator();

const App = () => {

  [isSignedIn, setIsSignedIn] = useState(false)



  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {
              !isSignedIn ?
                (
                  <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                  </>
                )
                :
                (
                  <>
                    {/* <Stack.Screen setIsSignedIn={setIsSignedIn} name="Splash" component={SplashScreen} /> */}
                    <Stack.Screen name="Splash">
                      {(props) => <SplashScreen setIsSignedIn={setIsSignedIn} />}
                    </Stack.Screen>
                  </>
                )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};


export default App;
