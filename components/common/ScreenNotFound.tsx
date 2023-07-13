import React from "react";
import { View } from "react-native";

import { configs, uiEl } from "../../config/common";
import { styles } from "../../css/css";

import CustomButton from "./CustomButton";
import PageTitle from "./PageTitle";

function ScreenNotFound({ navigation }: { navigation: any }) {
  return (
    <>
      <PageTitle title={uiEl.common.texts.titlePageNotFound} />
      <View style={styles.container}>
        <CustomButton
          title={uiEl.auth.texts.linkBackToLogin}
          onPress={() => navigation.navigate(configs.pagesUrl.auth.login)}
        />
      </View>
    </>
  );
}

export default ScreenNotFound;
