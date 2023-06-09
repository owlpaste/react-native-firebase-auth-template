import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { styles } from '../../css/css';
import { uiEl } from '../../config/common';

function ResetPassword({ navigation }: { navigation: any }) {
   const [email, setEmail] = useState('');
   const [error, setError] = useState<string | null>(null);
   const [submitted, setSubmitted] = useState(false);

   const resetUserPassword = async () => {
      try {
         await sendPasswordResetEmail(auth, email);
         setSubmitted(true);
         setError(null);
      } catch (error: any) {
         if (error.code === 'auth/user-not-found') {
            setError(uiEl.auth.errors.userNotFound);
         } else {
            setError(uiEl.auth.errors.genericError);
         }
      }
   };

   return (
      <View style={styles.inner} testID={uiEl.auth.pageId.recoverPassword}>
         <View>
            <Text style={styles.header}>{uiEl.auth.texts.titleResetPass}</Text>
         </View>

         {error !== null && (
            <View>
               <Text style={styles.error}>{error}</Text>
            </View>
         )}

         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>{uiEl.auth.texts.linkBackToLogin}</Text>
         </TouchableOpacity>

         {submitted ? (
            <Text>{uiEl.auth.texts.textPassReset}</Text>
         ) : (
            <>
               <TextInput
                  autoCapitalize='none'
                  keyboardType='email-address'
                  onChangeText={setEmail}
                  placeholder={uiEl.auth.texts.placeholderEmailAddress}
                  placeholderTextColor='#aaa'
                  style={styles.input}
                  testID={uiEl.auth.selectors.inputEmailAddress}
                  value={email}
               />
               <View style={styles.inputButton}>
                  <Button
                     disabled={!email}
                     onPress={resetUserPassword}
                     testID={uiEl.auth.selectors.buttonResetPass}
                     title={uiEl.auth.texts.titleResetPass}
                  />
               </View>
            </>
         )}
      </View>
   );
}

export default ResetPassword;
