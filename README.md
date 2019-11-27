With the help of this tool you can keep record and then perform query of a beverage stall

Now it supports:

1. Save Command
2. Query Command

Save:
syntax: node beverage.js --save --beverage <beverageChoice> --qty <quantity> --empId <employeeId>

- all mentioned options given are mandetory for save

Query:
syntax: node beverage.js --query --empId <employeeId>
syntax: node beverage.js --query --empId <employeeId> --date <date>
syntax: node beverage.js --query --date <date>

- empId or date or combination of both is mandetory for query

**Options can be given in any order
**command (--save/--query) must be given in firt field

Options:

--beverage: It accepts any string except empty string

--date: It accepts date in YYYY-MM-DD format only, Please provide valid date for perform an action

--qty: It accepts any positive integer

--empId: It accepts any positive integer
