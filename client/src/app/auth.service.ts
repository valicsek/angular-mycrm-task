import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) { }

  get isLoggedIn() {
    return this.cookieService.get('username').length > 0;
  }

  authenticateUser(username, password) {
    return this.http.post('http://localhost:1995/authenticateUser',
      {
        username,
        password
      });
  }

  /**
   * This function logs out the user
   */
  logOutTheUser() {
    if (this.isLoggedIn) {
      this.cookieService.delete('username');
    }
  }
}
