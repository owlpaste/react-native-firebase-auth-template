import React from "react";
import { Button, StyleSheet, View } from "react-native";

const CustomButton = ({
  disabled,
  onPress,
  title,
}: {
  disabled?: any;
  onPress: () => void;
  title: string;
}) => {
  return (
    <View style={styles.inputButton}>
      <Button onPress={onPress} title={title} disabled={disabled} />
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  inputButton: {
    marginBottom: "1em",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
  link: {
    color: "blue",
    marginBottom: "1em",
  },
});
