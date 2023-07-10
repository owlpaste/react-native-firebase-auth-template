import React, { useState } from "react";
import { View } from "react-native";

import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { configs, uiEl } from "../../config/common";
import { NotificationType } from "../common/types";
import { styles } from "../../css/css";

import CustomButton from "../common/CustomButton";
import InputWithLabel from "../common/InputWithLabel";
import Notification from "../common/Notification";
import PageTitle from "../common/PageTitle";

function ScreenSignup({ navigation }: { navigation: any }) {
  const [confirmPassword, handleSetConfirmPassword] = useState("");
  const [email, handleSetEmail] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [password, handleSetPassword] = useState("");

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError(uiEl.auth.errors.passwordsNotMatch);
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setError(uiEl.auth.errors.incorrectEmailAddress);
      } else if (error.code === "auth/email-already-in-use") {
        setError(uiEl.auth.errors.emailInUse);
      } else {
        setError(`${uiEl.auth.errors.genericError} ${error.code}`);
      }
    }
  };

  const disabled = !email || !password || !confirmPassword;

  return (
    <View style={styles.inner}>
      <PageTitle title={uiEl.auth.texts.titleSignup} />

      <Notification type={NotificationType.error} message={error} />

      <CustomButton
        onPress={() => navigation.navigate(configs.pagesUrl.auth.login)}
        title={uiEl.auth.texts.loginExistingAccount}
      />
      <View>
        <InputWithLabel
          autoCapitalize="none"
          kbdType="email-address"
          labelText={uiEl.auth.texts.placeholderEmailAddress}
          onChange={handleSetEmail}
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
        <InputWithLabel
          kbdType="default"
          labelText={uiEl.auth.texts.placeholderConfirmPassword}
          onChange={handleSetConfirmPassword}
          placeholder={uiEl.auth.texts.placeholderConfirmPassword}
          required={true}
          secureTextEntry={true}
          value={confirmPassword}
        />
      </View>

      <CustomButton
        disabled={disabled}
        onPress={createAccount}
        title={uiEl.auth.texts.buttonCreateAccount}
      />
    </View>
  );
}

export default ScreenSignup;
