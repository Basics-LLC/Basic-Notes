# Test Framework - Electron

Contents:

- [Test Framework - Electron](#test-framework---electron)
- [Summary](#summary)
  - [Issue](#issue)
  - [Decision](#decision)
  - [Status](#status)
  - [Details](#details)
    - [Assumptions](#assumptions)
    - [Constraints](#constraints)
    - [Positions](#positions)
    - [Argument](#argument)
  - [Related](#related)
    - [Related decisions](#related-decisions)
    - [Related principles](#related-principles)


# Summary


## Issue

We want to use a test framework to test the electron version of our application:

  * The main problem with testing Electron apps is the lack of established and updated frameworks. 

  * While there was once support by **Spectron** to test electron apps, that was only till Electron version 13, and has been completely deprecated as of today.

  * The best alternative to Spectron is **Playwright**: a framework created and maintained by Microsoft, and moreover integrated with TypeScript.
  * Playwright has experimental Electron support via Electron's support for the Chrome DevTools Protocol (CDP). More info [here](https://www.electronjs.org/docs/latest/tutorial/automated-testing#using-playwright). 



## Decision

Decided on Microsoft Playwright to write tests for our electron app. Playwright launches the app in development mode and has access to the main process module.


## Status

Keeping Playwright as our default testing framework. Open to alternatives, but it seems that there are no other alternatives available that are as competent as playwright.


## Details


### Assumptions

We wanted to have a mechanism that will test our electron app as easily as the PWA version. We decided to use playwright because of the following reasons - 

* It is both open-source and seems to have Electron support baked in. 
* Playwright works similar to other testing frameworks (Selenium, Cypress), i.e. it launches the actual application and mimics the actions a user would do, clicking on elements, writing things in text inputs, going through different flows.
* Assertions are added to make sure the expected results happen in the UI — for example, the opening of a panel or changing a label. 
* Although more time-consuming, launching an application in this way is preferable to running it from source code, since this more closely mimics the end-user experience. 


### Constraints

While playwright does support end-to-end testing of electron, the support is still experimental. There are a lot of things that playwright still doesn't allow us to do.

For example, when clicking the save button, electron opens a save file dialog where the user must input a file name and select the location to save the file. This action happens outside the context of electron and is very difficult to mimic in playwright.


### Positions

* We were able to write tests for the rendering process of our application to check if each element is rendered correctly.

```javascript
test.describe('Render the first page', async () => { 
    test('text elements exist', async () => { 
        expect(await page. $('#main' )).toBeTruthy(); 
        expect(await page. $('#title')).toBeTruthy(); 
        expect(await page. $('#textarea')).toBeTruthy(); 
        expect (await page. $('#fileLoader')).toBeTruthy();
    });

    test('buttons exists', async () => {
        expect(await page. $('#button-group')).toBeTruthy();
        expect(await page. $('#new-file')).toBeTruthy();
        expect(await page. $('#upload-file')).toBeTruthy();
        expect(await page. $('#save-file')).toBeTruthy();
    });
}
``` 
* We also needed tests for the file handling modules, but it was difficult to interact with the file handling module which uses native system dialogs.

```javascript
test('new file button', async () => {
  // check new-file button
  await page.click('#new-file');
  const title = await page.inputValue('#title');
  expect(title).toBe('');
  const content = await page.inputValue('#textarea');
  expect(content).toBe('');
});
```

### Argument

Currently there seem to be no other alternative to Playwright, and it is better to test our system functionality using everything that Playwright allows us to do.

## Related


### Related decisions

Playwright allows us to perform testing satisfactorily but is not completely free from hiccups.


### Related principles

* Testability
* Uniformity
* Robustness

