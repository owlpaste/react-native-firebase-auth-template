export const configs = Object.freeze({
   typingDelayMs: 10,
   waitAtEndOfTestMs: 2000,
   smallWaitMs: 500,
   website: 'http://localhost:19006/',
});

export const testData = Object.freeze({
   correctPassword: '123456',
   correctEmailAddress: 'test@test.com',
   incorrectEmailAddress: 'test1@test.com',
   notValidEmailAddress: 'test.test.com',
   incorrectPassword: '1234567',
});

export function getTestSelector(selector) {
   return `[data-testid="${selector}"]`;
}

export const uiEl = Object.freeze({
   auth: {
      selectors: {
         buttonCreateAccount: 'button-create-account',
         buttonDeleteAccount: 'delete-account',
         buttonLogin: 'button-login',
         buttonLogout: 'button-logout',
         buttonResetPass: 'reset-password',
         inputConfirmPassword: 'input-confirm-password',
         inputEmailAddress: 'input-email-address',
         inputPassword: 'input-password',
         linkExistingAccount: 'existing-account',
         textError: 'error-text',
         textPageTitle: 'page-title',
      },
      texts: {
         buttonCreateAccount: 'Create account',
         buttonDeleteAccount: 'Delete account',
         buttonLogin: 'Login',
         buttonLogout: 'Logout',
         linkBackToLogin: 'Back to login',
         linkForgotPass: "I've forgotten my password",
         loginExistingAccount: 'Login to existing account',
         placeholderConfirmPassword: 'Confirm password',
         placeholderEmailAddress: 'Enter email address',
         placeholderEnterPassword: 'Enter password',
         textPassReset: 'Please check your email for a reset password link.',
         titleLoggedIn: 'Manage account',
         titleLoginToAccount: 'Login to account',
         titleResetPass: 'Reset Password',
         titleSignup: 'Signup',
      },
      errors: {
         accountExists: 'An account with this email already exists',
         emailInUse: 'Email address already in use',
         genericError: 'There was a problem with your request',
         incorrectEmailAddress: 'Incorrect email address',
         incorrectEmailOrPass: 'Your email or password was incorrect',
         notLoggedIn: 'Not currently logged in',
         passwordsNotMatch: "Passwords don't match",
         userNotFound: 'User not found',
      },
      pageId: {
         login: 'login',
         signUp: 'sign-up',
         recoverPassword: 'recover-password',
         loggedIn: 'logged-in',
      },
   },
});
