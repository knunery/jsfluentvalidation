"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationResult = (function () {
	function ValidationResult(validationErrors) {
		_classCallCheck(this, ValidationResult);

		//this.errors = [];
		this.errors = validationErrors;
	}

	_createClass(ValidationResult, [{
		key: "isValid",
		value: function isValid() {
			return this.errors.length > 0;
		}
	}]);

	return ValidationResult;
})();

var ValidationError = function ValidationError(propertyName, error) {
	_classCallCheck(this, ValidationError);

	this.propertyName = propertyName;
	this.errorMessage = error;
};

var AbstractValidator = (function () {
	function AbstractValidator() {
		//this.rules =

		_classCallCheck(this, AbstractValidator);
	}

	_createClass(AbstractValidator, [{
		key: "validate",
		value: function validate() {
			return new ValidationResult(new [new ValidationError("firstName", "firstName cannot be null")]());
		}
	}], [{
		key: "RuleFor",
		value: function RuleFor(propertyName) {
			//return new RuleBuilder(propertyName);
		}
	}]);

	return AbstractValidator;
})();

var RuleBuilder = (function () {
	function RuleBuilder(propertyName) {
		_classCallCheck(this, RuleBuilder);

		this.propertyName = propertyName;
		this.rule = [];
	}

	_createClass(RuleBuilder, [{
		key: "addRule",
		value: function addRule(rule) {
			this.rule.push(rule);
		}
	}, {
		key: "isNotNullOrEmpty",
		value: function isNotNullOrEmpty() {

			this.addRule(NotNullorEmptyValidator);
		}
	}]);

	return RuleBuilder;
})();

var CustomerValidator = (function (_AbstractValidator) {
	_inherits(CustomerValidator, _AbstractValidator);

	function CustomerValidator() {
		_classCallCheck(this, CustomerValidator);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerValidator).apply(this, arguments));
	}

	_createClass(CustomerValidator, [{
		key: "contstructor",
		value: function contstructor() {
			RuleFor("firstName").notNullOrUndefined();
		}
	}]);

	return CustomerValidator;
})(AbstractValidator);

var NotNullorEmptyValidator = (function () {
	function NotNullorEmptyValidator(context) {
		//this.context = context;

		_classCallCheck(this, NotNullorEmptyValidator);
	}

	_createClass(NotNullorEmptyValidator, [{
		key: "isValid",
		value: function isValid(context) {
			if (context.propertyValue === null || context.propertyValue === undefined) {
				return false;
			}
			return true;
		}
	}]);

	return NotNullorEmptyValidator;
})();

exports.CustomerValidator = CustomerValidator;