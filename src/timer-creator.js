let latestId = 0;

module.exports = function createTimerCreator() {
    const timeoutList = new Map();

    let paused = false;

    function setInterval (cb, duration, ...args) {
        return createTimeout(cb, duration, args);
    }

    function setTimeout (cb, duration, ...args) {
        return createTimeout(cb, duration, args, true);
    }

    function clearInterval (id) {
        const timeout = timeoutList.get(id);

        if (!timeout) {
            return;
        }

        window.clearTimeout(timeout.iid);

        timeoutList.delete(id);
    }

    function createTimeout (cb, duration, args, isTimeout = false) {
        const timeoutid = ++latestId;

        const timeout = {
            cb: cb,
            duration: duration,
            skipped: false,
            isTimeout,
            args,
        };

        timeoutList.set(timeoutid, timeout);

        const creator = isTimeout ? window.setTimeout : window.setInterval;

        const iid = creator(() => {
            if (paused) {
                timeout.skipped = true;
                return;
            }

            cb(...args);

            if (timeout.isTimeout) {
                clearInterval(timeoutid);
            }
        }, duration);

        timeout.iid = iid;

        return timeoutid;
    }

    function setPausedState (isPaused) {
        if (paused === isPaused) {
            return isPaused;
        }

        if (!isPaused) {
            timeoutList.forEach((timeout, id) => {
                if (timeout.skipped) {
                    timeout.cb(...timeout.args);
                    timeout.skipped = false;

                    if (timeout.isTimeout) {
                        clearInterval(id);
                    }
                }
            });
        }

        paused = isPaused;

        return paused;
    }

    return {
        setPausedState,
        clearInterval,
        clearTimeout: clearInterval,
        setInterval,
        setTimeout,
    };
};
