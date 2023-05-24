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
      <View style={styles.outer} testID={uiEl.auth.pages.recoverPassword}>
         <View style={styles.inner}>
            <View style={styles.header}>
               <Text
                  testID={uiEl.auth.selectors.textPageTitle}
                  style={styles.header}
               >
                  {uiEl.auth.texts.titleResetPass}
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

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
               <Text style={styles.link}>
                  {uiEl.auth.texts.linkBackToLogin}
               </Text>
            </TouchableOpacity>

            {submitted ? (
               <Text>{uiEl.auth.texts.textPassReset}</Text>
            ) : (
               <>
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

                  <Button
                     title={uiEl.auth.texts.titleResetPass}
                     testID={uiEl.auth.selectors.buttonResetPass}
                     onPress={resetUserPassword}
                     disabled={!email}
                  />
               </>
            )}
         </View>
      </View>
   );
}

export default ResetPassword;
