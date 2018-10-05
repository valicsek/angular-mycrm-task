import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private Auth: AuthService,
        private router: Router,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
    }

    /**
     * This function determines that the user has the right to visit the dashboard.
     * If not or the form is not valid then alert the user.
     * @param event The event of the login form
     */
    authenticateUser(event) {
        event.preventDefault();
        const target = event.target;
        const username = target.querySelector('#username').value;
        const password = target.querySelector('#password').value;

        if (username && password) {
            this.Auth.authenticateUser(username, password).subscribe(data => {
                if (data['success']) {
                    this.cookieService.set('username', username);
                    this.router.navigate(['dashboard']);
                } else alert('Username or password is not correct');
            });
        }
        else alert('Username or password is missing');
    }

}
