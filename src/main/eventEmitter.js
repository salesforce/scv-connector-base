/**
An emitter implementation based on the Node.js EventEmitter API:
https://nodejs.org/dist/latest-v6.x/docs/api/events.html#events_class_eventemitter
Adapted from https://git.soma.salesforce.com/aura/lightning-global/blob/master/ui-lightning-components/src/main/modules/lightning/utilsPrivate/eventEmitter.js
**/
/** @ignore **/ 
export class EventEmitter {
    constructor(whitelistedEventNames) {
        this.registry = {};
        this._whitelistedEventNames = whitelistedEventNames ? whitelistedEventNames : null;
    }

    validateEventName(name) {
        if (!this._whitelistedEventNames) {
            return;
        }

        if (!this._whitelistedEventNames.has(name)) {
            throw new Error(`Unsupported event name: ${name}`);
        }
    }

    /**
    Registers a listener on the emitter
    @method EventEmitter#on
    @param {String} name - The name of the event
    @param {Function} listener - The callback function
    @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
    **/
    on(name, listener) {
        this.validateEventName(name);
        this.registry[name] = this.registry[name] || [];
        this.registry[name].push(listener);
        return this;
    }

    /**
    Registers a listener on the emitter that only executes once
    @method EventEmitter#once
    @param {String} name - The name of the event
    @param {Function} listener - The callback function
    @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
    **/
    once(name, listener) {
        this.validateEventName(name);
        const doOnce = function() {
            listener.apply(null, arguments);
            this.removeListener(name, doOnce);
        }.bind(this);
        this.on(name, doOnce);
        return this;
    }

    /**
    Synchronously calls each listener registered with the specified event
    @method EventEmitter#emit
    @param {String} name - The name of the event
    @param {Object} args - The args to be passed over to the listener
    @return {Boolean} - Returns `true` if the event had listeners, `false` otherwise
    **/
    emit(name, ...args) {
        this.validateEventName(name);
        const listeners = this.registry[name];
        let foundListener = false;
        if (listeners) {
            listeners.forEach(listener => {
                foundListener = true;
                listener.apply(null, args);
            });
        }
        return foundListener;
    }

    /**
    Removes the specified `listener` from the listener array for the event named `name`
    @method EventEmitter#removeListener
    @param {String} name - The name of the event
    @param {Function} listener - The callback function
    @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
    **/
    removeListener(name, listener) {
        this.validateEventName(name);
        const listeners = this.registry[name];
        if (listeners) {
            for (let i = 0, len = listeners.length; i < len; i += 1) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        return this;
    }
}
