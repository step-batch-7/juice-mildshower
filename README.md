# Beverage Counter

## With the help of this tool you can manage records of a **Beverage Stall** with ease

### It supports:

1. **Save Command**
2. **Query Command**

> **Save**:
>
> > `syntax: node beverage.js --save --beverage <beverageChoice> --qty <quantity> --empId <employeeId>`
>
> - all mentioned options given are mandetory for save

> **Query**:
>
> > `syntax: node beverage.js --query --empId <employeeId>`
>
> > `syntax: node beverage.js --query --empId <employeeId> --date <date>`
>
> > `syntax: node beverage.js --query --date <date>`
>
> - empId or date or combination of both is mandetory for query

- Options can be given in any order
- Command (--save/--query) must be given in first field
- If any option is repeated with valid choice then the last choice will be taken for that option
- If any option is given that is not needed for the command then that will be ignored. However the choice of the option must be valid to make the command work.

> **Options**:
>
> > _`--beverage:`_ It accepts any string except empty string.
>
> > _`--date:`_ It accepts date in YYYY-MM-DD format only, Please provide valid date to make the action perform.
>
> > _`--qty:`_ It accepts any positive integer.
>
> > _`--empId:`_ It accepts any positive integer.

# Install

## Run these commands in your shell to use the tool

> `git clone https://github.com/step-batch-7/juice-mildshower.git`
>
> `cd juice-mildshower`
