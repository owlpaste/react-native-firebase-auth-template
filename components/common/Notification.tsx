import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NotificationType } from "./types";

interface NotificationProps {
  type: NotificationType;
  message: string | null;
}

function Notification({ type, message }: NotificationProps) {
  const getStyleByType = () => {
    switch (type) {
      case NotificationType.error:
        return styles.error;
      case NotificationType.notification:
        return styles.notification;
      case NotificationType.success:
        return styles.success;
      default:
        return null;
    }
  };

  const notificationStyle = getStyleByType();
  return (
    <>
      {message !== null && (
        <View style={[styles.container, notificationStyle]}>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
    </>
  );
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  error: {
    backgroundColor: "#cc2a24",
  },
  notification: {
    backgroundColor: "#3a95d2",
  },
  success: {
    backgroundColor: "#28a745",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
