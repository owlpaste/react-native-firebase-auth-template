import React from "react";
import { View } from "react-native";

import { configs, uiEl } from "../../config/common";
import { styles } from "../../css/css";

import CustomButton from "./CustomButton";
import PageTitle from "./PageTitle";

function ScreenNotFound({ navigation }: { navigation: any }) {
  return (
    <View style={styles.inner}>
      <View>
        <PageTitle title={uiEl.common.texts.titlePageNotFound} />

        <CustomButton
          title={uiEl.auth.texts.linkBackToLogin}
          onPress={() => navigation.navigate(configs.pagesUrl.auth.login)}
        />
      </View>
    </View>
  );
}

export default ScreenNotFound;
