# PWA App Framework

Contents:

- [PWA App Framework](#desktop-app-framework)
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

* Frameworks like Electron and Cordova only offer support for desktop or mobile respectively and other stuff is more experimental
* PWAs are far more ubiquitous and are supported on almost any device


## Decision

Decided on PWAs


## Status

Continuing with PWAs and Electron JS on a shared codebase

## Details


### Assumptions

* The decision was between either completely dropping features such as file handling or dropping support for Firefox
* Since we aimed to follow a user-centered approach, it was decided to drop support for Firefox due to the small marketshare


### Constraints

* Coming up with an electron version of our app meant effectively halving our development team in favour of generating apps which support different platforms.
* The also meant that some features would be cut short since now the development effort is reduced.
* The increased overhead for testing since electron and PWA require different frameworks for testing.
* The filesystem API has incredibly limited support so most things were learnt by experimenting around things.

### Positions


* We briefly considered developing an app for smartphones using javascript frameworks like Cordova. However, this meant developing and testing for both mobile OS's - Android and iOS, which are vastly different from each another (even individual versions being poles apart from one other) and would result in a huge testing and development overhead.  Moreover developing for desktop meant that almost all users would be supported and the app could be easily tested.
* The process began with a cookoff between PWA and electron, and with both versions reaching a usable state, it seemed promising to bundle both versions in a single code base.

### Argument

* PWAs robustly supports the local first principle, since all notes are stored locally. This increases data security.
* PWAs have limited documentation and limited OS level API support due to the browser's sandbox
* PWAs have more mature testing libraries but require testing on multiple browsers


### Implications

Building PWAs will support multiple users, but will increase testing and development effort. The task is to efficiently balance testing and development within the given time frame constraint.


## Related


### Related decisions

* Managing PWA and Electron in a single code base and designing build pipelines for both.

### Related principles

* Keeping the user first
* Availability
* Usability
