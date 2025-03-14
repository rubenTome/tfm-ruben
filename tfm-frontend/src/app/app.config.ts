import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const fbApp = () => initializeApp({
  databaseURL: "https://tfm-bd-3e179-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "tfm-bd-3e179",
});

const firebaseProviders = [
provideFirebaseApp(fbApp),
provideFirestore(() => getFirestore()),
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), ...firebaseProviders]
};
