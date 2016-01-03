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
	constructor(propertyName, error)
	{
		this.propertyName = propertyName;
		this.errorMessage = error;
	}
}

class AbstractValidator
{
	constructor()
	{
		//this.rules = 
	}

	validate(){
		return new ValidationResult(
			[
				new ValidationError("firstName", "firstName cannot be null")
			]
		);
	}

	static RuleFor(propertyName)
	{
		//return new RuleBuilder(propertyName);
	}
}

class RuleBuilder {
	
	constructor(propertyName){
		this.propertyName = propertyName;
		this.rule = [];
	}

	addRule(rule)
	{
		this.rule.push(rule);
	}

	isNotNullOrEmpty() {

		this.addRule(NotNullorEmptyValidator);
	};

}


class CustomerValidator extends AbstractValidator
{
	contstructor()
	{
		 RuleFor("firstName").notNullOrUndefined();
	}
}

class NotNullorEmptyValidator
{
	constructor(context)
	{
		//this.context = context;
	}

	isValid(context){
			if(context.propertyValue === null || context.propertyValue === undefined)
			{
				return false;
			}
				return true;

		}

}

exports.CustomerValidator = CustomerValidator;
