class ValidationResult {
	constructor(validationErrors) {
		//this.errors = [];
		this.errors = validationErrors;
	}

	isValid() {
		return this.errors.length === 0;
	};
}

class ValidationError {
	constructor(propertyName, error) {
		this.propertyName = propertyName;
		this.errorMessage = error;
	}
}

class AbstractValidator {
	constructor() {
		console.log('AbstractValidator constructor');
		this.rules = [];
	}

	validate(model) {
		console.log('validate model');
		console.log(this.rules);
		var errors = [];

		this.rules.forEach(function(rule) {
			console.log("rule.propertyName - " + rule.propertyName);
			console.log(rule.validators);

			var propertyName = rule.propertyName;
			var propertyValue = model[propertyName];

			rule.validators.forEach(function (validator){
				//var validatorInstance = new validator();
				var validatorInstance = validator;

				console.log(propertyValue);
				var context = {propertyValue: propertyValue};

				if(validatorInstance.isValid(context) === false)
				{
					errors.push(new ValidationError(propertyName, "firstName cannot be null"));
				}
			});
		});

		return new ValidationResult(errors);
	}


	RuleFor(propertyName) {
		console.log('RuleFor' + propertyName);
		var ruleBuilder = new RuleBuilder(propertyName);

		this.rules.push( ruleBuilder );

		return ruleBuilder;
		//return new RuleBuilder(propertyName);
	}
}

class RuleBuilder {

	constructor(propertyName) {
		console.log("RuleBuilder constructor");

		this.propertyName = propertyName;
		this.validators = [];
	}

	addValidator(validator) {
		this.validators.push(validator);
	}

	notNullOrUndefined() {
		this.addValidator(new NotNullorEmptyValidator());

	};

	length(min, max) {
		this.addValidator(new LengthValidator(min, max));
	}

	emailAddress() {
		this.addValidator( new EmailValidator());
	}

}


class CustomerValidator extends AbstractValidator {
	constructor() {
		super();
		this.RuleFor("firstName").notNullOrUndefined();
		this.RuleFor("lastName").length(1,10);
		this.RuleFor("email").emailAddress();
	}
}

class NotNullorEmptyValidator {
	constructor() {
		//this.context = context;
	}

	isValid(context) {
		if (context.propertyValue === null || context.propertyValue === undefined) {
			return false;
		}
		return true;

	}

}

class LengthValidator {
	constructor(min, max) {
		this.min = min;
		this.max = max;
	}

	isValid(context) {
		if(typeof context.propertyValue !== "string") {
			return false;
		}

		if (context.propertyValue.legnth < this.min || context.propertyValue.length > this.max)
			return false;

		return true;
	}
}

class EmailValidator {
	constructor() {
		this.message = (propertyName) => "'${propertyName}' is not a valid email address.";
		this.expression = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
		
	}
	
	isValid(context) {
		return this.expression.test(context.propertyValue);
	}
}

class LessThanValidator {
	constructor(value) {
		this.value = value;	
	}

	isValid(context) {
		return context.propertyValue < this.value;
	}
}

class MoreThanValidator {
	constructor(value) {
		this.value = value;
	}

	isValid(context) {
		return context.propertyValue > this.value;
	}
}

exports.EmailValidator = EmailValidator;
exports.CustomerValidator = CustomerValidator;
