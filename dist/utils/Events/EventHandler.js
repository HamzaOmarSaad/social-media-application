"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
class EventHandler {
    emitter;
    constructor(emitter) {
        this.emitter = emitter;
    }
    publish(eventName, ...args) {
        this.emitter.emit(eventName, args);
    }
    subscribe(eventName, listener) {
        this.emitter.on(eventName, listener);
    }
}
exports.EventHandler = EventHandler;
