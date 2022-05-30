// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://localhost:5001/api/",
  firebase: {
    apiKey: "AIzaSyBtN5Mm8P2N3GMbkNLyP6aWB-W5s7AJjQU",
    authDomain: "sfaecommerce-pushnotifications.firebaseapp.com",
    projectId: "sfaecommerce-pushnotifications",
    storageBucket: "sfaecommerce-pushnotifications.appspot.com",
    messagingSenderId: "856057949312",
    appId: "1:856057949312:web:35e712422a449545fa0a65",
    measurementId: "G-PCZHKCSXE6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
