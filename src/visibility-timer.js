const timerCreator = require('./timer-creator');

const { setPausedState, ...timerFuncs } = timerCreator();

if (document) {
    document.addEventListener('visibilityChange', function __onVisibilityChange() {
        setPausedState(document.hidden);
    });
}

module.exports = timerFuncs;
