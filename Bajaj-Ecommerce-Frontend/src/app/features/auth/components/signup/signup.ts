// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { User } from '../../model/user-model';
// import { AuthUserService } from '../../service/auth-user-service';
// import { Router } from '@angular/router'; // Import Router

// @Component({
//   selector: 'bajaj-signup',
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './signup.html',
//   standalone: true,
//   styleUrl: './signup.css',
// })

// export class Signup {
//   private _formBuilder = inject(FormBuilder);
//   private _authService = inject(AuthUserService);
//   private _router = inject(Router); // Inject Router

//   errorMessage: string | null = null; // To display in HTML

//   signupForm = this._formBuilder.group({
//     name: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required],
//     phone: ['']
//   });

//   onSubmit() {
//     this.errorMessage = null; // Clear old errors
//     if (this.signupForm.valid) {
//       const user: User = {
//         name: this.signupForm.value.name!,
//         email: this.signupForm.value.email!,
//         password: this.signupForm.value.password!,
//         phone: this.signupForm.value.phone!,
//         role: 'customer'
//       };

//       this._authService.register(user).subscribe({
//         next: res => {
//           console.log('Signup successful', res);
//           this._router.navigate(['/']); // Go to home on success
//         },
//         error: err => {
//           console.error('Signup failed', err.error); // Log the full error object

//           // --- THIS IS THE UPDATED LOGIC ---
//           if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
//             // Grab the first message from the 'errors' array
//             this.errorMessage = err.error.errors[0].msg || err.error.errors[0]; 
//           } else if (err.error && err.error.error) {
//             // Handle other formats like { error: '...' }
//             this.errorMessage = err.error.error;
//           } else {
//             // Fallback message
//             this.errorMessage = 'An unknown signup error occurred.';
//           }
//         }
//       });
//     }
//   }
// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user-model';
import { AuthUserService } from '../../service/auth-user-service';
import { Router } from '@angular/router'; // <-- 1. Import Router

@Component({
  selector: 'bajaj-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  standalone: true,
  styleUrl: './signup.css',
})
export class Signup {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthUserService);
  private _router = inject(Router); // <-- 2. Inject Router

  errorMessage: string | null = null; // <-- 3. Add this

  signupForm = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['']
  });

  onSubmit() {
    this.errorMessage = null; // Clear old errors
    if (this.signupForm.valid) {
      const user: User = {
        name: this.signupForm.value.name!,
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
        phone: this.signupForm.value.phone!,
        role: 'customer'
      };

      this._authService.register(user).subscribe({
        next: res => {
          // --- 4. Handle Success ---
          console.log('Signup successful', res);
          // Navigate to the home page
          this._router.navigate(['/']); 
        },
        error: err => {
          // --- 5. Handle Specific Error ---
          console.error('Signup failed', err.error); 
          
          if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
            // Get message from the {errors: [...]} array
            this.errorMessage = err.error.errors[0].msg || err.error.errors[0];
          } else if (err.error && err.error.error) {
            // Handle other formats like { error: '...' }
            this.errorMessage = err.error.error;
          } else {
            this.errorMessage = 'An unknown signup error occurred.';
          }
        }
      });
    }
  }
}