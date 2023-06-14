@Authentication @FirebaseResetUser
Feature: Authentication - screens

  Scenario: Can visit login screen
    When I visit "sign-in" screen
    Then I should see a screen title "Sign in to my account"
    And I should see a "Create account" button in "enabled" state
    And I should see a "Sign in" button in "disabled" state
    And I should see an input with a "Enter email address" placeholder
    And I should see an input with a "Enter password" placeholder
    And I should see a link "I've forgotten my password"

  Scenario: Can visit sign-up screen
    When I visit "sign-up" screen
    Then I should see a screen title "Create account"
    And I should see a "Create account" button in "disabled" state
    And I should see an input with a "Enter email address" placeholder
    And I should see an input with a "Enter password" placeholder
    And I should see an input with a "Confirm password" placeholder
    And I should see a link "Login to existing account"

  Scenario: Can visit reset password screen
    When I visit "reset-password" screen
    Then I should see a screen title "Reset password"
    And I should see a "Reset password" button in "disabled" state
    And I should see an input with a "Enter email address" placeholder
    And I should see a link "Back to login"

  Scenario: I can visit <finalScreen> by clicking a link <link> from <originScreen> screen
    Given I visit "<originScreen>" screen
    When I click the "<link>" link to follow to "<finalScreen>"
    Then I should see a screen title "<title>"

    Examples: 
      | originScreen   | link                       | finalScreen    | title                 |
      | sign-in        | I've forgotten my password | reset-password | Reset password        |
      | sign-up        | Login to existing account  | sign-in        | Sign in to my account |
      | reset-password | Back to login              | sign-in        | Sign in to my account |

  Scenario: Cannot press disabled <button> button in <screen>
    When I visit "<screen>" screen
    Then I should see a screen title "<title>"
    And I cannot click on disabled button "<button>"
    And I should see a screen title "<title>"

    Examples: 
      | screen         | button         | title                 |
      | reset-password | Reset password | Reset password        |
      | sign-up        | Create account | Create account        |
      | sign-in        | Sign in        | Sign in to my account |

  Scenario: Show error message when trying to login with <scenario>
    Given I visit "sign-in" screen
    And I should see a screen title "Sign in to my account"
    And I type "<username>" in "Enter email address" input
    And I cannot click on disabled button "Sign in"
    And I type "<password>" in "Enter password" input
    When I click the "Sign in" button
    Then I should see an error message: "<error>"

    Examples: 
      | scenario                    | username      | password | error                                |
      | incorrect email address     | test username |   123456 | Your email or password was incorrect |
      | account that does not exist | test@test.com |   123456 | User not found                       |

  Scenario: Show a 404 page when I visit a non-existent url
    When I visit "page-that-doesnt-exist" screen
    Then I should see a screen title "Page not found"
    And I should see a link "Back to login"
    When I click the "Back to login" button
    Then I should see a screen title "Sign in to my account"
