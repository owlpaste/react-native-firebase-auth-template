import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import LoggedIn from './components/auth/LoggedIn';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import Signup from './components/auth/Signup';

import { styles } from './css/css';

export interface ScreenSetter {
   (screen: string | null): void;
}

export default function App() {
   const [loggedIn, setLoggedIn] = useState(false);

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setLoggedIn(true);
         } else {
            setLoggedIn(false);
         }
      });
   }, []);

   const Stack = createNativeStackNavigator();

   return (
      <View style={styles.outer} testID='Outer'>
         <NavigationContainer>
            <Stack.Navigator
               screenOptions={{
                  headerShown: false,
               }}
            >
               {loggedIn ? (
                  <>
                     <Stack.Screen name='LoggedIn' component={LoggedIn} />
                  </>
               ) : (
                  <>
                     <Stack.Screen name='Login' component={Login} />
                     <Stack.Screen name='Signup' component={Signup} />
                     <Stack.Screen
                        name='ResetPassword'
                        component={ResetPassword}
                     />
                  </>
               )}
            </Stack.Navigator>
         </NavigationContainer>
      </View>
   );
}
