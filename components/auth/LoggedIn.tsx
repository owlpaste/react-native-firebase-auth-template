import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { deleteUser, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { styles } from '../../css/css';
import { uiEl } from '../../config/common';

function LoggedIn() {
   const [error, setError] = useState<string | null>(null);

   const logout = async () => {
      try {
         await signOut(auth);
      } catch (e) {
         setError(`${uiEl.auth.errors.genericError} ${e}`);
      }
   };

   const deleteUserRequest = async () => {
      if (auth.currentUser) {
         try {
            await deleteUser(auth.currentUser);
            await signOut(auth);
         } catch (e) {
            setError(`${uiEl.auth.errors.genericError}: ${e}`);
         }
      } else {
         setError(uiEl.auth.errors.notLoggedIn);
      }
   };

   return (
      <View style={styles.inner} testID={uiEl.auth.pageId.loggedIn}>
         <View>
            <Text style={styles.header}>{uiEl.auth.texts.titleLoggedIn}</Text>
         </View>

         {error !== null && (
            <View>
               <Text style={styles.error}>{error}</Text>
            </View>
         )}

         <View style={styles.inputButton}>
            <Button onPress={logout} title={uiEl.auth.texts.buttonLogout} />
         </View>
         <View style={styles.inputButton}>
            <Button
               onPress={deleteUserRequest}
               title={uiEl.auth.texts.buttonDeleteAccount}
            />
         </View>
      </View>
   );
}

export default LoggedIn;
