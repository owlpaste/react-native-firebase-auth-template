import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { deleteUser, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { styles } from '../../css/css';
import { uiEl } from '../../config/common';

function LoggedIn() {
   const [error, setError] = useState(null || String);

   const logout = async () => {
      try {
         await signOut(auth);
      } catch (e) {
         console.error(e);
      }
   };

   const deleteUserRequest = async () => {
      if (auth.currentUser) {
         try {
            await deleteUser(auth.currentUser);
            await signOut(auth);
         } catch (e) {
            console.error(e);
         }
      } else {
         setError(uiEl.auth.errors.notLoggedIn);
      }
   };

   return (
      <View
         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
         testID={uiEl.auth.pages.loggedIn}
      >
         <Text testID={uiEl.auth.selectors.textPageTitle}>
            {uiEl.auth.texts.titleLoggedIn}
         </Text>
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
            testID={uiEl.auth.selectors.buttonLogout}
            title={uiEl.auth.texts.buttonLogout}
            onPress={logout}
         />
         <Button
            testID={uiEl.auth.selectors.buttonDeleteAccount}
            title={uiEl.auth.texts.buttonDeleteAccount}
            onPress={deleteUserRequest}
         />
      </View>
   );
}

export default LoggedIn;
