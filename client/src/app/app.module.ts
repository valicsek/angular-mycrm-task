import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AgmCoreModule } from '@agm/core';

// UI PART
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule, MatToolbarBase } from '@angular/material/toolbar';
import { MatGridListModule, MatListModule, MatFormFieldModule, MatInputModule } from '@angular/material'
import { MatButtonModule } from '@angular/material/button';

const ROUTE_PATHS = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] } // If the user requests something irrelevant like /asgkng, we should handle it.
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTE_PATHS),
    AgmCoreModule.forRoot({
      apiKey: ''
    }),

    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
