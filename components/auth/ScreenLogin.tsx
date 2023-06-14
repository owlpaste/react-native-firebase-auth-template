import React, { useState } from "react";
import { View, Text } from "react-native";

import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { styles } from "../../css/css";
import { uiEl, configs } from "../../config/common";

import CustomButton from "../common/CustomButton";
import InputWithLabel from "../common/InputWithLabel";

function ScreenLogin({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleSetPassword = (text: string) => {
    setPassword(text);
  };

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
        setError(uiEl.auth.errors.incorrectEmailOrPass);
      } else if (error.code === "auth/email-already-in-use") {
        setError(uiEl.auth.errors.accountExists);
      } else if (error.code === "auth/user-not-found") {
        setError(uiEl.auth.errors.userNotFound);
      } else {
        setError(`${uiEl.auth.errors.genericError} ${error.code}`);
      }
    }
  };

  const isButtonDisabled = !email || !password;

  return (
    <View style={styles.inner}>
      <View>
        <Text style={styles.header}>{uiEl.auth.texts.titleLoginToAccount}</Text>
      </View>

      {error !== null && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <CustomButton
        onPress={() => navigation.navigate(configs.pagesUrl.auth.signup)}
        title={uiEl.auth.texts.buttonCreateAccount}
      />

      <InputWithLabel
        autoCapitalize="none"
        kbdType="email-address"
        labelText={uiEl.auth.texts.placeholderEmailAddress}
        onChange={handleEmailChange}
        placeholder={uiEl.auth.texts.placeholderEmailAddress}
        required={true}
        value={email}
      />
      <InputWithLabel
        kbdType="default"
        labelText={uiEl.auth.texts.placeholderEnterPassword}
        onChange={handleSetPassword}
        placeholder={uiEl.auth.texts.placeholderEnterPassword}
        required={true}
        secureTextEntry={true}
        value={password}
      />

      <CustomButton
        onPress={() => navigation.navigate(configs.pagesUrl.auth.recoverPassword)}
        title={uiEl.auth.texts.linkForgotPass}
      />
      <CustomButton
        disabled={isButtonDisabled}
        onPress={loginUser}
        title={uiEl.auth.texts.buttonLogin}
      />
    </View>
  );
}

export default ScreenLogin;
