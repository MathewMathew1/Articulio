import { isDevMode } from '@angular/core';

export const MAIN_ROUTE_API =  isDevMode()?  "http://localhost:5012/": "https://articulio.click/"