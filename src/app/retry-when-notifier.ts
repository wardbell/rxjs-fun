import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';

import { AppEventBus } from 'app/app-event-bus.service';

export type RetryWhenNotifier = (errors: Observable<any>) => Observable<any>;
/**
 * Create an Observable.retryWhen notifier
 *
 * @param appEventBus
 * @param svcName
 * @param url
 *
 * Can use with JSONP but please note
 * JSONP isn't an XHR call so it has no failure info even though
 * a JSONP error presents as an XHR Response.
 * Let's pretend it is an XHR response.
 */
export function createRetryWhenNotifier(appEventBus: AppEventBus, svcName?: string, url?: string): RetryWhenNotifier {

    let retries = 0;
    svcName = svcName || 'Service';
    url = url || '';

    const svcErrName =  svcName + ' error';

    return (errors: Observable<Response>) => errors.switchMap(err => {

      // No point in retrying if the URL isn't recognized
      if (err.status === 404) {
        appEventBus.log(svcName + ' error', `Url ${url} not found.`);
        throw err;

      // Fail if retried 3 times
      } else if (retries++ === 3) {
          const emsg = 'Retried 3 times. No luck';
          appEventBus.log(svcErrName, emsg, err);
          throw new Error(emsg);

      // Progressive retry (each retry takes a second longer)
      // by returning an observable
      } else {
        appEventBus.log(svcName, 'Retry #' + retries);
        return of(err).delay(1000 * retries);
      }
    });

}
