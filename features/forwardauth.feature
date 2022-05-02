Feature: ForwardAuth

  Scenario: xxxx
    Given Alice is not authenticated
    When Alice visits foo.com
    Then Alice should be asked to authenticate

  Scenario: yyy
    Given Bob is authenticated
    When Bob visits foo.com
    Then Bob should be allowed to proceed
