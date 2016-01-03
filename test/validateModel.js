var assert = require('assert');
var customerValidator = require("../dist/validator"); 

describe('Customer Validation', function() {
  describe('#validate()', function () {
    it('should fail when firstName is null', function () {
      var customer = {firstName: null};

console.log(customerValidator);
	   var validator = new customerValidator.CustomerValidator();

      var validationResult = validator.validate(customer);

      assert.equal(false, validationResult.isValid());
    });
  });
});