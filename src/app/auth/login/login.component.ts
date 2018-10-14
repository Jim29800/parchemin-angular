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
  username : string = '';
  password : string = '';
  error : string = '';

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }



  setMessage() {
    this.message = (this.authService.isTokenExist() ? 'Vous êtes connecté en tant que :' : 'Identification');
  }

  login() {
    this.error = '';
    if (this.username == '' || this.password == '') {
      this.error = 'Veuillez renseigner tout les champs.'
    }else{

      this.message = 'Vérification en cours...';
      
      this.authService.login(this.username, this.password).subscribe(
        () => {
          this.setMessage();
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          location.reload();
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/product-list';
          // Redirect the user
          this.router.navigate([redirect]);
        },
        err => {
          this.setMessage();
          console.log(err)
          if (err["status"] == 401) {
            this.error = 'Erreur,identifiant ou mot de passe incorect.'
          }
        }
      );
    }
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}