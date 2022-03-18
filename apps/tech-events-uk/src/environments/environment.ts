// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Environment } from "./environment.interface";

export const environment: Environment = {
  production: false,
  eventsAPI: '/api/events',
};
