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
         } else if (error.code === 'auth/user-not-found') {
            setError(uiEl.auth.errors.userNotFound);
         } else {
            setError(`${uiEl.auth.errors.genericError} ${error.code}`);
         }
      }
   };

   return (
      <View style={styles.inner} testID={uiEl.auth.pageId.login}>
         <View>
            <Text style={styles.header}>
               {uiEl.auth.texts.titleLoginToAccount}
            </Text>
         </View>

         {error !== null && (
            <View>
               <Text style={styles.error}>{error}</Text>
            </View>
         )}

         <View style={styles.inputButton}>
            <Button
               onPress={() => navigation.navigate('Signup')}
               title={uiEl.auth.texts.buttonCreateAccount}
            />
         </View>

         <TextInput
            autoCapitalize='none'
            keyboardType='email-address'
            onChangeText={setEmail}
            placeholder={uiEl.auth.texts.placeholderEmailAddress}
            placeholderTextColor='#aaa'
            style={styles.input}
            value={email}
         />
         <TextInput
            autoCapitalize='none'
            onChangeText={setPassword}
            placeholder={uiEl.auth.texts.placeholderEnterPassword}
            placeholderTextColor='#aaa'
            secureTextEntry
            style={styles.input}
            value={password}
         />

         <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={[styles.link, { color: '#333' }]}>
               {uiEl.auth.texts.linkForgotPass}
            </Text>
         </TouchableOpacity>

         <View style={styles.inputButton}>
            <Button
               disabled={!email || !password}
               onPress={loginUser}
               title={uiEl.auth.texts.buttonLogin}
            />
         </View>
      </View>
   );
}

export default Login;
