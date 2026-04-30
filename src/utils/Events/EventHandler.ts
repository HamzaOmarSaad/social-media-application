import EventEmitter from "events";

export type EventTypes = "confirm-Email" | "forgetPassword";

export class EventHandler {
  constructor(private emitter: EventEmitter) {}

  publish(eventName: EventTypes, ...args: any) {
    this.emitter.emit(eventName, args);
  }
  subscribe(
    eventName: EventTypes,
    listener: (...args: any[]) => void | Promise<void>,
  ) {
    this.emitter.on(eventName, listener);
  }
}
