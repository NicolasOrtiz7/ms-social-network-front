import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

// Registra el idioma español
registerLocaleData(es);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
