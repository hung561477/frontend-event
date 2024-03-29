// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  CONTENT_TYPE: 'application/json',
  // AUTH_SERVICE_ENDPOINT: 'http://192.168.1.13:3000',
  AUTH_SERVICE_ENDPOINT: 'https://event-backend-dot-meta-yen-216402.appspot.com',
  EXCHANGE_RATE_API: 'https://api.exchangeratesapi.io/latest?base=USD'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
