"use strict";

// Error messages copied from Jeremy Skinner's Fluent Validation

var errorMessages = {
  emailError: "{PropertyName}' is not a valid email address.",
  greaterthanorequal_error: "'{PropertyName}' must be greater than or equal to '{ComparisonValue}'.",
  greaterthan_error: "'{PropertyName}' must be greater than '{ComparisonValue}'.",
  length_error: "'{PropertyName}' must be between {MinLength} and {MaxLength} characters. You entered {TotalLength} characters.",
  lessthanorequal_error: "'{PropertyName}' must be less than or equal to '{ComparisonValue}'.",
  lessthan_error: "'{PropertyName}' must be less than '{ComparisonValue}'.",
  notempty_error: "'{PropertyName}' should not be empty.",
  notequal_error: "'{PropertyName}' should not be equal to '{ComparisonValue}'.",
  notnull_error: "'{PropertyName}' must not be empty.",
  predicate_error: "The specified condition was not met for '{PropertyName}'.",
  regex_error: "'{PropertyName}' is not in the correct format.",
  equal_error: "'{PropertyName}' should be equal to '{ComparisonValue}'.",
  exact_length_error: "'{PropertyName}' must be {MaxLength} characters in length. You entered {TotalLength} characters.",
  inclusivebetween_error: "'{PropertyName}' must be between {From} and {To}. You entered {Value}.",
  exclusivebetween_error: "'{PropertyName}' must be between {From} and {To} (exclusive). You entered {Value}.",
  CreditCardError: "'{PropertyName}' is not a valid credit card number.",
  scale_precision_error: "'{PropertyName}' may not be more than {expectedPrecision} digits in total, with allowance for {expectedScale} decimals. {digits} digits and {actualScale} decimals were found.",
  empty_error: "'{PropertyName}' should be empty.",
  null_error: "'{PropertyName}' must be empty."
};