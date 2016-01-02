class ValidationResult {
	constructor() {
		this.errors = [];
		this.isValid = function () {
			return errors.length > 0;
		};
	}
}

class ValidationError {
	constructor(propertyName, error)
	{
		this.propertyName = propertyName;
		this.error = error;
	}
}