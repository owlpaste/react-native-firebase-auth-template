import React, { useState } from "react";
import { View, Text } from "react-native";

import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import { configs, uiEl } from "../../config/common";
import { NotificationType } from "../common/types";
import { styles } from "../../css/css";

import CustomButton from "../common/CustomButton";
import InputWithLabel from "../common/InputWithLabel";
import Notification from "../common/Notification";
import PageTitle from "../common/PageTitle";

function ScreenResetPassword({ navigation }: { navigation: any }) {
  const [email, handleSetEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError(uiEl.auth.errors.userNotFound);
      } else {
        setError(uiEl.auth.errors.genericError);
      }
    }
  };

  const disabled = !email;

  return (
    <>
      <PageTitle title={uiEl.auth.texts.titleResetPass} />
      <View style={styles.container}>
        <Notification type={NotificationType.error} message={error} />

        <CustomButton
          onPress={() => navigation.navigate(configs.pagesUrl.auth.login)}
          title={uiEl.auth.texts.linkBackToLogin}
        />

        {submitted ? (
          <Text>{uiEl.auth.texts.textPassReset}</Text>
        ) : (
          <>
            <InputWithLabel
              autoCapitalize="none"
              kbdType="default"
              labelText={uiEl.auth.texts.placeholderEmailAddress}
              onChange={handleSetEmail}
              placeholder={uiEl.auth.texts.placeholderEmailAddress}
              required={true}
              secureTextEntry={true}
              value={email}
            />

            <CustomButton
              disabled={disabled}
              onPress={resetUserPassword}
              title={uiEl.auth.texts.titleResetPass}
            />
          </>
        )}
      </View>
    </>
  );
}

export default ScreenResetPassword;
