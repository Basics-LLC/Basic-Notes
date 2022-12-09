# Basic-Notes

After cloning the repo, please run `npm install`.

In order to see the **PWA** version webpage, run `npm start`. This will open the app at https://localhost:8080.

In order to package the **Electron** app into a desktop application, run `npm run package`. This will create an `out/` directory which will house your packaged app.

## PWA Version Push Rules

Before committing your changes, please follow below steps:

1. Run command `npm run lint:pwa` at the root directory. If these are errors, go to step 2; Or go to step 3.
2. Run command `npm run lint-fix` at the root directory. And then run command `npm run lint:pwa` at the root directory again. If there are still errors in the second command report, fix them manually.
3. Run command `npm run test_pwa:unit` at the root directory to make sure all tests passed. You **MUST** also write your own tests to cover your functions.
4. Run command `npm run test_pwa:integration` at the root directory to make sure all tests passed. Among them there are screenshots comparison tests. If you changed the UI, make sure to take a look at the generated `test-results` directory at the root path, where you can compare the expected(original) screenshots and actual(new) screenshots. If they look good, delete `__tests__/tests_pwa/integration_tests/*-snapshots` directories and run the test for **twice**. You **MUST** also write your own tests to cover your functions.
5. Run command `npm run jsdoc:pwa` at the root directory.

Alternatively, you can run the command `npm run presubmit:pwa` at the root path to check at once. But for debugging you should run the above commands step by step.

## PWA Guideline For TA

### Website URL

[https://basics-llc.github.io/Basic-Notes/](https://basics-llc.github.io/Basic-Notes/)

### Two Modes

1. Basic Mode: Under this mode, users can only upload file and save the current contents as a new file.
2. Advanced Mode: Under this mode, users can open a local directory and edit files in this directory.

#### Mode Switch

Users can only switch from Basic Mode to Advanced Mode by clicking `OPEN DIRECTORY` button.

### Tests

#### Unit Tests

located at `/__tests__/tests_pwa/unit_tests`.

1. `createNewFile.test.js`: This test is used to test the cleanUp function, which aims to clear the current contents of file name and text.
2. `uploadFile.test.js`: This test is used to verify file name and text could be displayed successfully.
3. `saveFile.test.js`: This test is used to test whether the download link has been generated successfully.
4. `filter.test.js`: This test is used to check the functionality of file list filter.

#### Integration Tests

located at `/__tests__/tests_pwa/integration_tests`.

1. `launch.test.js`: This test is used to test whether the web app could be loaded correctly. Including UI test.
2. `basicScenario.test.js`: This test describes several scenarios of the web app under basic mode. Including UI test.
3. `advancedScenario.test.js`: This test describes several scenarios of the web app under advanced mode. Including UI test.

### Online JSDoc

[https://basics-llc.github.io/Basic-Notes/jsdoc_pwa/](https://basics-llc.github.io/Basic-Notes/jsdoc_pwa/)

## Electron Version Push Rules

Before committing your changes, please follow below steps:

1. Run command `npm run lint:elec` at the root directory. If these are errors, go to step 2; Or go to step 3.
2. Run command `npm run lint-fix` at the root directory. And then run command `npm run lint:elec` at the root directory again. If there are still errors in the second command report, fix them manually.
3. Run command `npm run test_elec:integration` at the root directory to make sure all tests passed. Among them there are screenshots comparison tests. If you changed the UI, make sure to take a look at the generated `test-results` directory at the root path, where you can compare the expected(original) screenshots and actual(new) screenshots. If they look good, delete `__tests__/tests_elec/integration_tests/*-snapshots` directories and run the test for **twice**. You **MUST** also write your own tests to cover your functions.
4. Run command `npm run jsdoc:elec` at the root directory.

Alternatively, you can run the command `npm run presubmit:elec` at the root path to check at once. But for debugging you should run the above commands step by step.

## Electron Guideline For TA

### Tests

#### Integration Tests

To run the tests, use 
`npm run test_elec:integration` at the root directory.

The test files are located at `/__tests__/tests_elec/integration_tests`

1. `launch.test.js`: This test is used to test whether the key elements could be loaded correctly. Including UI test.
2. `fileSystem.test.js`: This test is used to test the electron app's interaction with the file system.

### Packaging the app
In order to obtain a packaged app to simply double-click and get going, run `npm run package`. This will create an `out/` directory which will house your packaged app.

### Packaging the app with redistributables and an installer
In order to obtain a packaged app along with redistributables, run `npm run make`. This will create an `out/` directory which will contain the two directories, one with the app and the other called `make` which will contain the redistributables.

### Online JSDoc

[https://basics-llc.github.io/Basic-Notes/jsdoc_elec/](https://basics-llc.github.io/Basic-Notes/jsdoc_elec/)
