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

}


class CustomerValidator extends AbstractValidator {
	constructor() {
		super();
		this.RuleFor("firstName").notNullOrUndefined();
		this.RuleFor("lastName").length(1,10);
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

exports.CustomerValidator = CustomerValidator;
