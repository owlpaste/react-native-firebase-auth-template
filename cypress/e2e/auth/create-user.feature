@Authentication @FirebaseResetUser
Feature: Authentication - create user

  Scenario: Unhappy - create user scenario: "<scenario>"
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I know there is a "Display name" label
    And I type "<displayName>" in "Public profile name" input
    And I should see a "Display name" label
    And I cannot click on disabled button "Create account"
    And I know there is a "Email address" label
    And I type "<emailAddress>" in "Enter email address" input
    And I should see a "Email address" label
    And I cannot click on disabled button "Create account"
    And I know there is a "Password" label
    And I type "<password>" in "Enter password" input
    And I should see a "Password" label
    And I cannot click on disabled button "Create account"
    And I know there is a "Confirm password" label
    And I type "<confirmPassword>" in "Confirm password" input
    And I should see a "Confirm password" label
    When I click the "Create account" button
    Then I should see an error message: "<error>"

    Examples: 
      | scenario                | displayName | emailAddress      | password | confirmPassword | error                   |
      | incorrect email address | Fuzzball    | test emailAddress |   123456 |          123456 | Incorrect email address |
      | passwords do not match  | Fuzzball    | test@test.com     |   123456 |          654321 | Passwords do not match  |

  Scenario: Unhappy - create user scenario: "<scenario>"
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user "<displayName>" with email: "<emailAddress>", password: "<password>"
    And I visit "profile" screen
    And I should see a screen title "Manage account"
    And I click the "Logout" button
    And I should see a screen title "Sign in to my account"
    And I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I type "<displayName>" in "Public profile name" input
    And I type "<emailAddress>" in "Enter email address" input
    And I type "<password>" in "Enter password" input
    And I type "<confirmPassword>" in "Confirm password" input
    When I click the "Create account" button
    Then I should see an error message: "<error>"

    Examples: 
      | scenario    | displayName | emailAddress   | password | confirmPassword | error                        |
      | user exists | Fuzzball    | test@1test.com |   123456 |          123456 | Email address already in use |

  Scenario: Unhappy - Cannot login after creating a user
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user "Fuzzball" with email: "test@1test.com", password: "123456"
    When I visit "sign-in" screen
    Then I should see a screen title "Manage account"
    And I should see the following text on the page: "Hi, Fuzzball!"

  Scenario: Deleted user cannot login
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user "Fuzzball" with email: "test@1test.com", password: "123456"
    And I should see a screen title "Manage account"
    When I click the "Delete account" button
    Then I should see a screen title "Sign in to my account"

  Scenario: Cannot login with wrong password
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user "Fuzzball" with email: "test@1test.com", password: "123456"
    And I should see a screen title "Manage account"
    And I click the "Logout" button
    When I login as user: "test@1test.com" with password: "654321"
    Then I should see an error message: "Your email or password was incorrect"
