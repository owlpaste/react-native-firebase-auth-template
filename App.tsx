import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import ScreenLogin from "./components/auth/ScreenLogin";
import ScreenNotFound from "./components/common/ScreenNotFound";
import ScreenProfile from "./components/auth/ScreenProfile";
import ScreenResetPassword from "./components/auth/ScreenResetPassword";
import ScreenSignup from "./components/auth/ScreenSignup";

import { styles } from "./css/css";
import { uiEl } from "./config/common";

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

  const linking = {
    prefixes: [],
    config: {
      screens: {
        Login: "sign-in",
        Profile: "profile",
        ResetPassword: "reset-password",
        Signup: "sign-up",
        NotFound: "*",
      },
    },
  };

  return (
    <View style={styles.outer}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {loggedIn ? (
            <>
              <Stack.Screen
                options={{ title: uiEl.auth.texts.titleLoggedIn }}
                name="Profile"
                component={ScreenProfile}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ title: uiEl.auth.texts.titleLoginToAccount }}
                name="Login"
                component={ScreenLogin}
              />
              <Stack.Screen
                options={{ title: uiEl.auth.texts.titleSignup }}
                name="Signup"
                component={ScreenSignup}
              />
              <Stack.Screen
                options={{ title: uiEl.auth.texts.titleResetPass }}
                name="ResetPassword"
                component={ScreenResetPassword}
              />
            </>
          )}
          <Stack.Screen
            options={{ title: uiEl.common.texts.titlePageNotFound }}
            name="NotFound"
            component={ScreenNotFound}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
