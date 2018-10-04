import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(username, password) {
    return this.http.post('http://localhost:1995/authenticateUser',
      {
        username,
        password
      });
  }
}
