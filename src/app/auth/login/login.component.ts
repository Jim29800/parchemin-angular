import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message : string;
  username : string;
  password : string;
  
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Vous ' + (this.authService.isLoggedIn() ? 'êtes connecté' : 'n\'êtes pas connecté');
  }

  login() {
    this.message = 'Vérification en cours...';

    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.setMessage();
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/product-list';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}