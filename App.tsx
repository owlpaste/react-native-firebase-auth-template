import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';
import LoggedIn from './components/auth/LoggedIn';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';

import { auth } from './config/firebase';

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
   );
}
