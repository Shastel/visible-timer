# visible-timer
> Simple timer scheduler, that makes ensure that time will be executed only when document is not hidden
---

* [Installation](#installation)
* [Usage](#usage)
* [Advanced Usage](#advanced)


## Installation

```sh
npm install visible-timer
```

## Usage

```javascript
  // You can use those as you usually do
  import {
    clearInterval,
    clearTimeout,
    setInterval,
    setTimeout,
  } from 'visible-timer';

  // But callback won't be executed unless document.hidden is false
  const timeout = setTimeout(() => console.log(42));
  clearTimeout(timeout);

```

## Advanced

```javascript
  // You can use those as you usually do
  import {
    timerCreator,
  } from 'visible-timer/timer-creator';

  // But callback won't be executed unless document.hidden is false
  const {
    clearInterval,
    clearTimeout,
    setInterval,
    setTimeout,
    setPausedState,
  } = timerCreator();

  // You can create custom sceduler by calling setPausedState with boolean

  setPausedState(true) // will pause all timeouts
  setPausedState(false) // will unpause all timeouts

```

## LICENSE

MIT
