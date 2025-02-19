// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-87f9f","appId":"1:50982636714:web:24ffad7518af6db7e554d3","storageBucket":"ring-of-fire-87f9f.firebasestorage.app","apiKey":"AIzaSyC5W_Gcf79Xnre5k4O3NOZAkBHX_XG2gSQ","authDomain":"ring-of-fire-87f9f.firebaseapp.com","messagingSenderId":"50982636714"})), provideFirestore(() => getFirestore())]
// };


import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC5W_Gcf79Xnre5k4O3NOZAkBHX_XG2gSQ",
      authDomain: "ring-of-fire-87f9f.firebaseapp.com",
      projectId: "ring-of-fire-87f9f",
      storageBucket: "ring-of-fire-87f9f.appspot.com",  
      messagingSenderId: "50982636714",
      appId: "1:50982636714:web:24ffad7518af6db7e554d3",
    })),
    provideFirestore(() => getFirestore())
  ]
};
