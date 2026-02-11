import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule , KeycloakService} from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {

  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082',
        realm: 'portal-interno-onboarding-clientes-nuevos',
        clientId: 'angular-client',
      },
      initOptions: {
        onLoad: 'login-required',
        flow: "standard",
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true
    });

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  /*
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  */
  bootstrap: [AppComponent]
})
export class AppModule { }
