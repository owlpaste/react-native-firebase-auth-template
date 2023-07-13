import { When, Step } from "@badeball/cypress-cucumber-preprocessor";

When(
  "I create a user {string} with email: {string}, password: {string}",
  (displayName: string, username: string, password: string) => {
    Step(this, 'I visit "sign-up" screen');
    Step(this, 'I should see a screen title "Create account"');
    Step(this, `I type "${displayName}" in "Public profile name" input`);
    Step(this, `I type "${username}" in "Enter email address" input`);
    Step(this, `I type "${password}" in "Enter password" input`);
    Step(this, `I type "${password}" in "Confirm password" input`);
    Step(this, 'I click the "Create account" button');
    Step(this, 'I should see a screen title "Manage account"');
  }
);

When("I login as user: {string} with password: {string}", (username: string, password: string) => {
  Step(this, 'I should see a screen title "Sign in to my account"');
  Step(this, `I type "${username}" in "Enter email address" input`);
  Step(this, `I type "${password}" in "Enter password" input`);
  Step(this, 'I click the "Sign in" button');
});
