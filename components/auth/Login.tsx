import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { styles } from '../../css/css';
import { uiEl } from '../../config/common';

function Login({ navigation }: { navigation: any }) {
   const [email, setEmail] = useState('');
   const [error, setError] = useState<string | null>(null);
   const [password, setPassword] = useState('');

   const loginUser = async () => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
         if (
            error.code === 'auth/invalid-email' ||
            error.code === 'auth/wrong-password'
         ) {
            setError(uiEl.auth.errors.incorrectEmailOrPass);
         } else if (error.code === 'auth/email-already-in-use') {
            setError(uiEl.auth.errors.accountExists);
         } else {
            setError(`${uiEl.auth.errors.genericError} ${error.code}`);
         }
      }
   };

   return (
      <View style={styles.outer} testID={uiEl.auth.pages.login}>
         <View style={styles.inner}>
            <View>
               <Text
                  testID={uiEl.auth.selectors.textPageTitle}
                  style={styles.header}
               >
                  {uiEl.auth.texts.titleLoginToAccount}
               </Text>
            </View>

            {error !== null && (
               <View>
                  <Text
                     testID={uiEl.auth.selectors.textError}
                     style={styles.error}
                  >
                     {error}
                  </Text>
               </View>
            )}

            <Button
               title={uiEl.auth.texts.buttonCreateAccount}
               onPress={() => navigation.navigate('Signup')}
            />

            <TextInput
               value={email}
               onChangeText={setEmail}
               keyboardType='email-address'
               testID={uiEl.auth.selectors.inputEmailAddress}
               placeholder={uiEl.auth.texts.placeholderEmailAddress}
               autoCapitalize='none'
               placeholderTextColor='#aaa'
               style={styles.input}
            />
            <TextInput
               value={password}
               onChangeText={setPassword}
               secureTextEntry
               testID={uiEl.auth.selectors.inputPassword}
               placeholder={uiEl.auth.texts.placeholderEnterPassword}
               autoCapitalize='none'
               placeholderTextColor='#aaa'
               style={styles.input}
            />

            <TouchableOpacity
               onPress={() => navigation.navigate('ResetPassword')}
            >
               <Text style={[styles.link, { color: '#333' }]}>
                  {uiEl.auth.texts.linkForgotPass}
               </Text>
            </TouchableOpacity>

            <Button
               title={uiEl.auth.texts.buttonLogin}
               onPress={loginUser}
               testID={uiEl.auth.selectors.buttonLogin}
               disabled={!email || !password}
            />
         </View>
      </View>
   );
}

export default Login;
