"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationResult = function ValidationResult() {
	_classCallCheck(this, ValidationResult);

	this.errors = [];
	this.isValid = function () {
		return errors.length > 0;
	};
};

var ValidationError = function ValidationError(propertyName, error) {
	_classCallCheck(this, ValidationError);

	this.propertyName = propertyName;
	this.error = error;
};