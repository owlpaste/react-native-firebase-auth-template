import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { auth } from "../../config/firebase";
import { User, deleteUser, reload, signOut } from "firebase/auth";

import { NotificationType } from "../common/types";
import { styles } from "../../css/css";
import { uiEl } from "../../config/common";

import CustomButton from "../common/CustomButton";
import Notification from "../common/Notification";
import PageTitle from "../common/PageTitle";

function ScreenProfile() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const currentUser = auth.currentUser;

    // As setting of display name is asynchronous to creating the account and this logs you
    // in immediately. We should reload user details if the "display name" is not set.
    if (currentUser && !currentUser.displayName) {
      reload(currentUser)
        .then(() => {
          const updatedUser = auth.currentUser;
          setUser(updatedUser);
        })
        .catch((error) => {
          setError(`${uiEl.auth.errors.genericError} ${error}`);
        });
    } else {
      setUser(currentUser);
    }
  }, []);

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
    <>
      <PageTitle title={uiEl.auth.texts.titleLoggedIn} />
      <View style={styles.container}>
        <Notification type={NotificationType.error} message={error} />

        {user?.displayName ? <Text>Hi, {user?.displayName}!</Text> : <></>}

        <CustomButton title={uiEl.auth.texts.buttonDeleteAccount} onPress={deleteUserRequest} />

        <CustomButton title={uiEl.auth.texts.buttonLogout} onPress={logout} />
      </View>
    </>
  );
}

export default ScreenProfile;
