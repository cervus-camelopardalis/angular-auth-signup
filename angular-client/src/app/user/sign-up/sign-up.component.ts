import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;

  formSignUp = new FormGroup({
    email: new FormControl('', [
      Validators.required, /* E-mail is required (i.e., user must enter e-mail otherwise the form is invalid --> button disabled) */
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") /* Input field only accepts a valid e-mail address (i.e., 'test@test.com', not 'test', not 'test@test', not 'test@test.' ) */
      /* Regex Angular e-mail validation pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" */
    ]),
    password: new FormControl('', [
      Validators.required /* Password is required (i.e., user must enter password otherwise the form is invalid --> button disabled) */
    ])
  });

  /* Function for e-mail errors */
  getErrorMessageEmail() {
    if (this.formSignUp.controls['email'].hasError('required')) {
      return 'E-mail is required';
    }
    return this.formSignUp.controls['email'].hasError('pattern') ? 'Not a valid e-mail' : '';
  }

  /* Function for password errors */
  getErrorMessagePassword() {
    return this.formSignUp.controls['password'].hasError('required') ? 'Password is required' : '';
  }

  /* ABOVE THIS: Error messages for better UX */
  /*************************************************************************************************/
  /*************************************************************************************************/
  /*************************************************************************************************/
  /* BELOW THIS: Subscription and communication with backend (i.e., Express server) */
  /* BELOW THIS: Redirection to the Sign in component and opening of the snackbar */

  baseUrl: string = 'http://localhost:5000/users';

  emailFromTheForm: string = '';
  passwordFromTheForm: string = '';
  router: any;
  
  onSubmitSignUp() {
    /* https://angular.io/guide/observables#subscribing */
    /* Create observer object */
    const signupObserver = {

      /* If everything is OK (i.e., user sign up successful)... */
      next: (x: any) => {
        console.log('Observer got a next value: ' + 'Sign up successful');

        /* ...navigate to the Sign in component so that the user can sign in after successful sign up... */
        /* this.signupRouter.navigate(['/after-sign-up']); */
        this.signupRouter.navigate(['/after-sign-up']).then((navigated: boolean) => {
          if (navigated) {
            /* ...and open the snackbar */
            this.snackBar.open('Sign up successful', 'Close', { duration: 5000, panelClass: ['my-green-snackbar'] }); /* CSS style added in styles.scss (global) */
          }
        });
      },

      /* If there is an error (i.e., user sign up unsuccessful) */
      error: (err: any) => {
        console.log('Observer got an error: ' + err);
      },

      /* If there are no errors and the subscription for that particular Observable is complete */
      /* NOTE: If the complete value is sent, nothing else can be delivered to the Observable */
      complete: () => {
        console.log('Observer got a complete notification');
      }

    };

    /* Subscribe and communicate with backend (i.e., Express server) */
    this.authService.signup(this.formSignUp.value).subscribe(signupObserver);
  }

  constructor(private authService: AuthService, private signupRouter: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

}
