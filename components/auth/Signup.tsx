import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { styles } from '../../css/css';
import { uiEl } from '../../config/common';

function Signup({ navigation }: { navigation: any }) {
   const [confirmPassword, setConfirmPassword] = useState('');
   const [email, setEmail] = useState('');
   const [error, setError] = useState<null | string>(null);
   const [password, setPassword] = useState('');

   const createAccount = async () => {
      try {
         if (password === confirmPassword) {
            await createUserWithEmailAndPassword(auth, email, password);
         } else {
            setError(uiEl.auth.errors.passwordsNotMatch);
         }
      } catch (error: any) {
         if (error.code === 'auth/invalid-email') {
            setError(uiEl.auth.errors.incorrectEmailAddress);
         } else if (error.code === 'auth/email-already-in-use') {
            setError(uiEl.auth.errors.emailInUse);
         } else {
            setError(`${uiEl.auth.errors.genericError} ${error.code}`);
         }
      }
   };
   console.log('error: ', error);

   return (
      <View style={styles.inner} testID={uiEl.auth.pageId.signUp}>
         <View>
            <Text style={styles.header}>{uiEl.auth.texts.titleSignup}</Text>
         </View>

         {error !== null && (
            <View>
               <Text style={styles.error}>{error}</Text>
            </View>
         )}

         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
               {uiEl.auth.texts.loginExistingAccount}
            </Text>
         </TouchableOpacity>

         <View>
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
            <TextInput
               autoCapitalize='none'
               onChangeText={setConfirmPassword}
               placeholder={uiEl.auth.texts.placeholderConfirmPassword}
               placeholderTextColor='#aaa'
               secureTextEntry
               style={styles.input}
               value={confirmPassword}
            />
         </View>

         <Button
            disabled={!email || !password || !confirmPassword}
            onPress={createAccount}
            title={uiEl.auth.texts.buttonCreateAccount}
         />
      </View>
   );
}

export default Signup;
