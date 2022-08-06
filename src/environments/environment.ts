// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    messagingSenderId: "287022135589"
  },
  oneSignal: '4aae4bb2-9f80-479e-99c8-9b1bacf4e3ef',
  app: {
    name: 'Crypto Inc Gold',
    company:'Crypto Inc',
    version: '1.0.0'
  },
  api: {
    url: 'https://sistema.cryptoinc.com.ec/api/v1',
    source: 'https://sistema.cryptoinc.com.ec'
    // url: 'http://localhost:8000/api/v1',
    // source: 'http://localhost:8000'
  },
  access: {
    name:'Afiliado4',
    email: 'afiliado3@yopmail.com',
    password: 'password'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
