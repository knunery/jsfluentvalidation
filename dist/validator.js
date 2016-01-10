'use strict';

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
		key: 'isValid',
		value: function isValid() {
			return this.errors.length === 0;
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
		_classCallCheck(this, AbstractValidator);

		console.log('AbstractValidator constructor');
		this.rules = [];
	}

	_createClass(AbstractValidator, [{
		key: 'validate',
		value: function validate(model) {
			console.log('validate model');
			console.log(this.rules);
			var errors = [];

			this.rules.forEach(function (rule) {
				console.log("rule.propertyName - " + rule.propertyName);
				console.log(rule.validators);

				var propertyName = rule.propertyName;
				var propertyValue = model[propertyName];

				rule.validators.forEach(function (validator) {
					//var validatorInstance = new validator();
					var validatorInstance = validator;

					console.log(propertyValue);
					var context = { propertyValue: propertyValue };

					if (validatorInstance.isValid(context) === false) {
						errors.push(new ValidationError(propertyName, "firstName cannot be null"));
					}
				});
			});

			return new ValidationResult(errors);
		}
	}, {
		key: 'RuleFor',
		value: function RuleFor(propertyName) {
			console.log('RuleFor' + propertyName);
			var ruleBuilder = new RuleBuilder(propertyName);

			this.rules.push(ruleBuilder);

			return ruleBuilder;
			//return new RuleBuilder(propertyName);
		}
	}]);

	return AbstractValidator;
})();

var RuleBuilder = (function () {
	function RuleBuilder(propertyName) {
		_classCallCheck(this, RuleBuilder);

		console.log("RuleBuilder constructor");

		this.propertyName = propertyName;
		this.validators = [];
	}

	_createClass(RuleBuilder, [{
		key: 'addValidator',
		value: function addValidator(validator) {
			this.validators.push(validator);
		}
	}, {
		key: 'notNullOrUndefined',
		value: function notNullOrUndefined() {
			this.addValidator(new NotNullorEmptyValidator());
		}
	}, {
		key: 'length',
		value: function length(min, max) {
			this.addValidator(new LengthValidator(min, max));
		}
	}, {
		key: 'emailAddress',
		value: function emailAddress() {
			this.addValidator(new EmailValidator());
		}
	}]);

	return RuleBuilder;
})();

var CustomerValidator = (function (_AbstractValidator) {
	_inherits(CustomerValidator, _AbstractValidator);

	function CustomerValidator() {
		_classCallCheck(this, CustomerValidator);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerValidator).call(this));

		_this.RuleFor("firstName").notNullOrUndefined();
		_this.RuleFor("lastName").length(1, 10);
		_this.RuleFor("email").emailAddress();
		return _this;
	}

	return CustomerValidator;
})(AbstractValidator);

var NotNullorEmptyValidator = (function () {
	function NotNullorEmptyValidator() {
		//this.context = context;

		_classCallCheck(this, NotNullorEmptyValidator);
	}

	_createClass(NotNullorEmptyValidator, [{
		key: 'isValid',
		value: function isValid(context) {
			if (context.propertyValue === null || context.propertyValue === undefined) {
				return false;
			}
			return true;
		}
	}]);

	return NotNullorEmptyValidator;
})();

var LengthValidator = (function () {
	function LengthValidator(min, max) {
		_classCallCheck(this, LengthValidator);

		this.min = min;
		this.max = max;
	}

	_createClass(LengthValidator, [{
		key: 'isValid',
		value: function isValid(context) {
			if (typeof context.propertyValue !== "string") {
				return false;
			}

			if (context.propertyValue.legnth < this.min || context.propertyValue.length > this.max) return false;

			return true;
		}
	}]);

	return LengthValidator;
})();

var EmailValidator = (function () {
	function EmailValidator() {
		_classCallCheck(this, EmailValidator);

		this.message = function (propertyName) {
			return "'${propertyName}' is not a valid email address.";
		};
		this.expression = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
	}

	_createClass(EmailValidator, [{
		key: 'isValid',
		value: function isValid(context) {
			return this.expression.test(context.propertyValue);
		}
	}]);

	return EmailValidator;
})();

var LessThanValidator = (function () {
	function LessThanValidator(value) {
		_classCallCheck(this, LessThanValidator);

		this.value = value;
	}

	_createClass(LessThanValidator, [{
		key: 'isValid',
		value: function isValid(context) {
			return context.propertyValue < this.value;
		}
	}]);

	return LessThanValidator;
})();

var MoreThanValidator = (function () {
	function MoreThanValidator(value) {
		_classCallCheck(this, MoreThanValidator);

		this.value = value;
	}

	_createClass(MoreThanValidator, [{
		key: 'isValid',
		value: function isValid(context) {
			return context.propertyValue > this.value;
		}
	}]);

	return MoreThanValidator;
})();

exports.EmailValidator = EmailValidator;
exports.CustomerValidator = CustomerValidator;