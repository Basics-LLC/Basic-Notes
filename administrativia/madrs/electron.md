# Desktop App Framework

Contents:

- [Desktop App Framework](#desktop-app-framework)
- [Summary](#summary)
  - [Issue](#issue)
  - [Decision](#decision)
  - [Status](#status)
  - [Details](#details)
    - [Assumptions](#assumptions)
    - [Constraints](#constraints)
    - [Positions](#positions)
    - [Argument](#argument)
    - [Implications](#implications)
  - [Related](#related)
    - [Related decisions](#related-decisions)
    - [Related principles](#related-principles)


# Summary


## Issue

* Since the filesystem access API is not supported by many browsers like firefox and safari, users with these browsers will not be able to use the PWA.
*  Instead of completely dropping support for these users, it was decided to develop an equivalent app which the users can download and use on their desktops.
*  Since the app is a desktop app, it has full access to the computer’s filesystem, thus guaranteeing a local first approach.
*  The app should be available for Windows, MacOS as well as Linux platforms, and should be equivalent in functionality to the PWA.    


## Decision

Decided on Electron JS.


## Status

Continuing with Electron JS since it supports all desktop platforms from a single codebase.


## Details


### Assumptions

* The decision was between either completely dropping support for unsupported browsers, or supporting these users in some other way.
* Since we aimed to follow a user-centered approach, it was decided not to drop user support.
* The addition of support stemmed from the idea of utilizing the "next best thing" to browsers for user devices, and that is to have a desktop app.
* If the app were released in the wild, doing this was considered an effective move since if this was not done, it would’ve been a different headache to later on include the unsupported users whenever we planned to add support.
* Doing so meant that all users are supported from the word go.


### Constraints

* Coming up with an electron version of our app meant effectively halving our development team in favour of generating apps which support different platforms.
* The also meant that some features would be cut short since now the development effort is reduced.
* The increased overhead for testing since electron and PWA require different frameworks for testing.
* An additional point of concern is the choice of a testing framework for electron since there seem to be not many supported frameworks that offer full functionality.


### Positions


* We briefly considered developing an app for smartphones using javascript frameworks like Cordova. However, this meant developing and testing for both mobile OS's - Android and iOS, which are vastly different from each another (even individual versions being poles apart from one other) and would result in a huge testing and development overhead.  Moreover developing for desktop meant that almost all users would be supported and the app could be easily tested.
* Using Electron, we can make sure all our users that install the application have the same experience, and then it becomes possible for us to collect feedback and improve user experience in a stable step.
* The process began with a cookoff between PWA and electron, and with both versions reaching a usable state, it seemed promising to bundle both versions in a single code base.

### Argument

* Electron robustly supports the local first principle, since all notes are stored locally. This increases data security.
* Electron offers control over the OS components using its own secure APIs which are implemented cross platform, meaning that the same code will result in appropriate behaviours in different OS's.
* The Electron framework is well documented.
* In some cases, electron apps have faster performance compared to native apps.
* The framework is reusable.


### Implications

Using electron will support multiple users, but will increase testing and development effort. The task is to efficiently balance testing and development within the given time frame constraint.


## Related


### Related decisions

* Choosing a testing framework for electron
* Managing PWA and Electron in a single code base and designing build pipelines for both.

### Related principles

* Keeping the user first
* Availability
* Usability