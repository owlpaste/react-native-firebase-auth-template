@Authentication @FirebaseResetUser
Feature: Authentication - create user

  Scenario: Unhappy - create user scenario: "<scenario>"
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I type "<username>" in "Enter email address" input
    And I cannot click on disabled button "Create account"
    And I type "<password>" in "Enter password" input
    And I cannot click on disabled button "Create account"
    And I type "<confirmPassword>" in "Confirm password" input
    When I click the "Create account" button
    Then I should see an error message: "<error>"

    Examples: 
      | scenario                | username      | password | confirmPassword | error                   |
      | incorrect email address | test username |   123456 |          123456 | Incorrect email address |
      | passwords do not match  | test@test.com |   123456 |          654321 | Passwords do not match  |

  Scenario: Unhappy - create user scenario: "<scenario>"
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user with email: "<username>", password: "<password>"
    And I visit "profile" screen
    And I should see a screen title "Manage account"
    And I click the "Logout" button
    And I should see a screen title "Sign in to my account"
    And I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I type "<username>" in "Enter email address" input
    And I type "<password>" in "Enter password" input
    And I type "<confirmPassword>" in "Confirm password" input
    When I click the "Create account" button
    Then I should see an error message: "<error>"

    Examples: 
      | scenario    | username       | password | confirmPassword | error                        |
      | user exists | test@1test.com |   123456 |          123456 | Email address already in use |

  Scenario: Unhappy - Cannot login after creating a user
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user with email: "test@1test.com", password: "123456"
    And I visit "sign-in" screen
    And I should see a screen title "Manage account"

  Scenario: Deleted user cannot login
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user with email: "test@1test.com", password: "123456"
    And I should see a screen title "Manage account"
    When I click the "Delete account" button
    Then I should see a screen title "Sign in to my account"

  Scenario: Cannot login with wrong password
    Given I visit "sign-up" screen
    And I should see a screen title "Create account"
    And I create a user with email: "test@1test.com", password: "123456"
    And I should see a screen title "Manage account"
    And I click the "Logout" button
    When I login as user: "test@1test.com" with password: "654321"
    Then I should see an error message: "Your email or password was incorrect"
