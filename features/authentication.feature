Feature: Authentication

#  Scenario: Invalid Credentials
#    Given Alice is at the Login Screen
#    When Alice enters invalid credentials
#    Then Alice should be shown an error message
#    And Alice should not be authenticated

  Scenario: Valid Credentials
    Given Bob is at the Login Screen
    When Bob enters valid credentials
    Then Bob should be shown a success message
    And Bob should be authenticated
