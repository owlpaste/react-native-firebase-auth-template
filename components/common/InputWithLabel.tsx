import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const InputWithLabel = ({
  autoCapitalize,
  kbdType,
  labelText,
  onChange,
  placeholder,
  required,
  secureTextEntry,
  value,
}: {
  autoCapitalize?: TextInputProps["autoCapitalize"];
  kbdType?: KeyboardTypeOptions;
  labelText: string;
  onChange: (text: string) => void;
  placeholder: string;
  required?: boolean;
  secureTextEntry?: TextInputProps["secureTextEntry"];
  value: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  const handleFocus = () => {
    Animated.timing(labelAnimation, {
      duration: 200,
      toValue: 1,
      useNativeDriver: false,
    }).start();
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      Animated.timing(labelAnimation, {
        duration: 200,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
    setIsFocused(false);
  };

  const labelStyle = {
    transform: [
      {
        translateY: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
    opacity: labelAnimation,
    pointerEvents: "none",
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {required && <Text style={styles.requiredIndicator}>*</Text>}
        <Text style={styles.beforeLabel}>{labelText}</Text>
      </Animated.Text>
      <TextInput
        accessibilityLabelledBy={`Input for ${placeholder}`}
        aria-label={`Input for ${placeholder}`}
        autoCapitalize={autoCapitalize ? autoCapitalize : "sentences"}
        keyboardType={kbdType ? kbdType : "default"}
        onBlur={handleBlur}
        onChangeText={onChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        placeholderTextColor={isFocused ? "transparent" : "#aaa"}
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

export default InputWithLabel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: "1em",
  },
  label: {
    fontColor: "#ccc",
    fontWeight: "normal",
    left: 20,
    position: "absolute",
    top: "1em",
  },
  beforeLabel: {},
  input: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: "1em",
    paddingHorizontal: 12,
    paddingVertical: 8,
    placeholderColor: "red",
  },
  requiredIndicator: {
    color: "#d2242f",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    marginRight: 3,
    verticalAlign: "middle",
  },
});
