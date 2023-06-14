import React from "react";
import { View, StyleSheet, Button } from "react-native";

const CustomButton = ({
  onPress,
  title,
  disabled,
}: {
  onPress: () => void;
  title: string;
  disabled?: any;
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#000000",
  },
  link: {
    color: "blue",
    marginBottom: "1em",
  },
});
