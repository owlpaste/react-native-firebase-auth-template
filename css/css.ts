import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outer: {
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    alignSelf: "center",
    flexGrow: 1,
    minWidth: "16em",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "2em",
    marginTop: "1em",
    textAlign: "center",
  },
});
