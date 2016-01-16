var assert = require('assert');
var validator = require("../dist/validator"); 

describe("EmailValidator", function() {
	it("should be invalid email", function(){
		var emailValidator = new validator.EmailValidator();

		var context = {propertyName:"", propertyValue: "notAvalidEmailAddress"};

		var isValid = emailValidator.isValid(context);

		assert.equal(isValid, false);
	});

	it("should be VALID email", function (){
		var emailValidator = new validator.EmailValidator();

		var context = {propertyName:"", propertyValue: "test@test.net"};

		var isValid = emailValidator.isValid(context);

		assert.equal(isValid, true);
	});
});