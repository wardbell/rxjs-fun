import { Injectable } from '@angular/core';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';


import { debugLog } from './debug-logger';

export class AppEvent {
  readonly type: string;
  readonly message: string;
}

@Injectable()
export class AppEventBus {

  private eventSubject = new BehaviorSubject<AppEvent[]>([]);

  /** Observable of AppEvents during this user session */
  events = this.eventSubject
   .scan((events, event) =>
    // clear if empty event array else concat to previous events, making a new events array
    event.length === 0 ? [] : events.concat(event), []);

  /** Add AppEvent to the bus. The rest (if any) goes to the console log */
  log(event: AppEvent, ...rest: any[])

  /** Add message to the bus as AppEvent "msg" type */
  log(message: string)

  /** Add {type, message} to the bus */
  log(type: string, message: string)

  /** Add {type, message} to the bus, the rest to the console log */
  log(type: string, message: string, ...rest: any[])

  log(event: AppEvent | string, msg?: string, ...rest: any[]) {
    if (typeof event === 'string') {
      event = msg === undefined ?
        { type: 'msg', message: event } :
        { type: event, message: msg};
    }
    this.eventSubject.next([event]);
    debugLog(event, ...rest);
  }

  /** Clear all AppEvents */
  clear() {
    this.eventSubject.next([]);
  }
}
