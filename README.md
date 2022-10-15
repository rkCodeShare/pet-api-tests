# API tests for pet store api's based on - https://petstore.swagger.io/v2/swagger.json

This framework is implementing http endpoint testing with the use of supertest & jest modules


### To Run Tests
Install node v14+
Run `npm install` to install dependencies

You can run tests on specific environment by running commands -

`npm run test:prod` - this will run tests against public api's hosted at https://petstore.swagger.io/v2/swagger.json
`npm run test:dev`  - this is just a place holder for now - but shows how tests can be extended to multiple environments.

Tests will run in parallel and will show results in terminal.
In addition, html report is also generated inside /reports folder.