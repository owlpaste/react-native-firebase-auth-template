export const NotificationType = {
  error: "error",
  notification: "notification",
  success: "success",
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
