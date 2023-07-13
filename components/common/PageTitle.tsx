import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TitleProps {
  title: string;
}

function PageTitle({ title }: TitleProps) {
  return (
    <View style={styles.pageHeader}>
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
}

export default PageTitle;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  pageHeader: {
    marginBottom: "2em",
    marginTop: "1em",
  },
});
