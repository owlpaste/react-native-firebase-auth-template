export const configs = {
  typingDelayMs: 0,
  waitAtEndOfTestMs: 2000,
  smallWaitMs: 500,
  website: "http://localhost:19006/",
  firebase: {
    projectId: "YOUR_FIREBASE_APP_ID",
  },
  pagesUrl: {
    auth: {
      login: "Login",
      signup: "Signup",
      recoverPassword: "ResetPassword",
      profile: "Profile",
    },
  },
};

export const uiEl = {
  auth: {
    texts: {
      buttonCreateAccount: "Create account",
      buttonDeleteAccount: "Delete account",
      buttonLogin: "Sign in",
      buttonLogout: "Logout",
      labelDisplayName: "Display name",
      labelEmailAddress: "Email address",
      labelPassword: "Password",
      labelConfirmPassword: "Confirm password",
      linkBackToLogin: "Back to login",
      linkForgotPass: "I've forgotten my password",
      loginExistingAccount: "Login to existing account",
      placeholderConfirmPassword: "Confirm password",
      placeholderDisplayName: "Public profile name",
      placeholderEmailAddress: "Enter email address",
      placeholderEnterPassword: "Enter password",
      textPassReset: "Please check your email for a reset password link.",
      titleLoggedIn: "Manage account",
      titleLoginToAccount: "Sign in to my account",
      titleResetPass: "Reset password",
      titleSignup: "Create account",
    },
    errors: {
      accountExists: "An account with this email already exists",
      cannotSetDisplayName: "Display name cannot be set",
      emailInUse: "Email address already in use",
      genericError: "There was a problem with your request",
      incorrectEmailAddress: "Incorrect email address",
      incorrectEmailOrPass: "Your email or password was incorrect",
      notLoggedIn: "Not currently logged in",
      passwordsNotMatch: "Passwords do not match",
      userNotFound: "User not found",
    },
  },
  common: {
    texts: {
      titlePageNotFound: "Page not found",
    },
  },
};
