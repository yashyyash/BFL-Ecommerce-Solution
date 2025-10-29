// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthUserService } from '../../service/auth-user-service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'bajaj-signin',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './signin.html',
//   styleUrl: './signin.css'
// })
// export class Signin {
//   private _formBuilder = inject(FormBuilder);
//   private _authService = inject(AuthUserService);
//   private _router = inject(Router);

//   errorMessage: string | null = null;

//   signinForm = this._formBuilder.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });

//   onSubmit() {
//     if (this.signinForm.valid) {
//       const credentials = {
//         email: this.signinForm.value.email!,
//         password: this.signinForm.value.password!
//       };

//       this._authService.login(credentials).subscribe({
//         next: (res) => {
//           console.log('Login successful', res);
//           // On success, go to the home page
//           this._router.navigate(['/']);
//         },
//         error: (err) => {
//           console.error('Login failed', err);
//           this.errorMessage = 'Invalid email or password. Please try again.';
//         }
//       });
//     }
//   }
// }
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user-service';
import { Router } from '@angular/router'; // <-- 1. Import Router

@Component({
  selector: 'bajaj-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthUserService);
  private _router = inject(Router); // <-- 2. Inject Router

  errorMessage: string | null = null; // <-- 3. Add this

  signinForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.errorMessage = null; // Clear old errors
    if (this.signinForm.valid) {
      const credentials = {
        email: this.signinForm.value.email!,
        password: this.signinForm.value.password!
      };

      this._authService.login(credentials).subscribe({
        next: (res) => {
          // --- 4. Handle Success ---
          console.log('Login successful', res);
          this._router.navigate(['/']); // Navigate to home
        },
        error: (err) => {
          // --- 5. Handle Specific Error ---
          console.error('Login failed', err.error);
          
          if (err.error && err.error.error) {
             // Handle { error: 'Invalid credentials' }
            this.errorMessage = err.error.error;
          } else if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
            // Handle validation like { errors: [...] }
            this.errorMessage = err.error.errors[0].msg || err.error.errors[0];
          } else {
            this.errorMessage = 'Invalid email or password.';
          }
        }
      });
    }
  }
}