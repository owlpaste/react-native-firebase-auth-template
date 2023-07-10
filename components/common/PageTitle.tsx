import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TitleProps {
  title: string;
}

function PageTitle({ title }: TitleProps) {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

export default PageTitle;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "2em",
    marginTop: "1em",
    textAlign: "center",
  },
});
