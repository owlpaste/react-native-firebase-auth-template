import React from "react";
import { Text, View } from "react-native";

import { configs, uiEl } from "../../config/common";
import { styles } from "../../css/css";

import CustomButton from "./CustomButton";

function ScreenNotFound({ navigation }: { navigation: any }) {
  return (
    <View style={styles.inner}>
      <View>
        <Text style={styles.header}>{uiEl.common.texts.titlePageNotFound}</Text>
        <CustomButton
          title={uiEl.auth.texts.linkBackToLogin}
          onPress={() => navigation.navigate(configs.pagesUrl.auth.login)}
        />
      </View>
    </View>
  );
}

export default ScreenNotFound;
