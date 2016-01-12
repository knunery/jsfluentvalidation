A fluent validation framework for javascript.

A loose port of Jeremy Skinner's Fluent Validation framework to JavaScript.

Uses ES2015 and Babeljs.

## Example Usage

```
class CustomerValidator extends AbstractValidator {
	constructor() {
		super();
		this.RuleFor("firstName").notNullOrUndefined();
		this.RuleFor("lastName").length(1,10);
		this.RuleFor("email").emailAddress();
	}
}
```

## Fluent Validators

isNotNullOrUndefined()

length(min, max)
isNotEmpty()
must( function() {} )
lessThan()
lessThanOrEqual
greaterThan()
greaterThanOrEqual()
equal()