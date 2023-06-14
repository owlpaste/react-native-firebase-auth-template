import React, { useState } from "react";
import { View, Text } from "react-native";

import { auth } from "../../config/firebase";
import { deleteUser, signOut } from "firebase/auth";

import { styles } from "../../css/css";
import { uiEl } from "../../config/common";

import CustomButton from "../common/CustomButton";

function ScreenProfile() {
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
    <View style={styles.inner}>
      <View>
        <Text style={styles.header}>{uiEl.auth.texts.titleLoggedIn}</Text>
      </View>

      {error !== null && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <CustomButton title={uiEl.auth.texts.buttonDeleteAccount} onPress={deleteUserRequest} />
      <CustomButton title={uiEl.auth.texts.buttonLogout} onPress={logout} />
    </View>
  );
}

export default ScreenProfile;
