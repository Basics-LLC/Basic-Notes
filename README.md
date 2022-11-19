# Basic-Notes

After cloning the repo, please run `npm install`.

In order to run the app, run `npm start`. This will open the app.

In order to package the app into a desktop application, run `npm run make`. This will create an `out/` directory which will house your packaged app.

To run eslint test: `npm run lint`.

To fix eslint errors: `npm run lint-fix`.

To run unit tests: `npm test`.

## PWA Version Push Rules

Before committing your changes, please follow below steps:

1. Run command `npm run lint:pwa` at the root directory. If these are errors, go to step 2; Or go to step 3.
2. Run command `npm run lint-fix` at the root directory. And then run command `npm run lint:pwa` at the root directory again. If there are still errors in the second command report, fix them manually.
3. Run command `npm run test_pwa:unit` at the root directory to make sure all tests passed. You **MUST** also write your own tests to cover your functions.
4. Run command `npm run test_pwa:integration` at the root directory to make sure all tests passed. Among them there are screenshots comparsion tests. If you changed the UI, make sure to take a look at the generated `test-results` directory at the root path, where you can compare the expected(original) screenshots and actual(new) screenshots. If they look good, delete `__tests__\tests_pwa\integration_tests\*-snapshots` directories and run the test for **twice**. You **MUST** also write your own tests to cover your functions.
5. Run command `npm run jsdoc:pwa` at the root directory.

Alternatively, you can run the command `npm run presubmit:pwa` at the root path to check at once. But for debugging you should run the above commands step by step.