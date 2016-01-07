var assert = require('assert');
var customerValidator = require("../dist/validator"); 

describe('Customer Validation', function() {
  describe('#validate()', function () {
    it('should fail when firstName is null', function () {
      var customer = {firstName: null, lastName: "jones"};

	   var validator = new customerValidator.CustomerValidator();

      var validationResult = validator.validate(customer);

      assert.equal(false, validationResult.isValid());
      assert.equal(1, validationResult.errors.length);
    });

    it('should not fail when firstName is not null', function() {
    	var customer = {firstName: "jessica", lastName: "jones"};

	   var validator = new customerValidator.CustomerValidator();

      var validationResult = validator.validate(customer);

      assert.equal(true, validationResult.isValid());
      assert.equal(0, validationResult.errors.length);
    });

    it('should fail when lastName is undefined', function() {
      var customer = {firstName: "jessica"};

     var validator = new customerValidator.CustomerValidator();

      var validationResult = validator.validate(customer);

      assert.equal(false, validationResult.isValid());
      assert.equal(1, validationResult.errors.length);
    });

  });
});