import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user-model';
import { AuthUserService } from '../../service/auth-user-service';
@Component({
  selector: 'bajaj-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  standalone: true,
  styleUrl: './signup.css',
})
export class Signup {
  //   private _httpClient = inject(HttpClient);
  //   private _formBuilder = inject(FormBuilder);
  //   private baseUrl = 'http://localhost:9090/api';


  // signupForm = this._formBuilder.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //     phone: [''],
  //   });

  //   onSubmit() {
  //     if (this.signupForm.valid) {
  //       const user: User = {
  //         name: this.signupForm.value.name!,
  //         email: this.signupForm.value.email!,
  //         password: this.signupForm.value.password!,
  //         phone: this.signupForm.value.phone!,
  //         role: 'customer', // default role
  //       };

  //       this._httpClient.post<User>(`${this.baseUrl}/auth/register`, user).subscribe({
  //         next: (res) => console.log('Signup successful', res),
  //         error: (err) => console.error('Signup failed', err),
  //       });
  //     }
  //   }

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthUserService);

  signupForm = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['']
  });

  onSubmit() {
    if (this.signupForm.valid) {
      const user: User = {
        name: this.signupForm.value.name!,
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
        phone: this.signupForm.value.phone!,
        role: 'customer'
      };

      this._authService.register(user).subscribe({
        next: res => console.log('Signup successful', res),
        error: err => console.error('Signup failed', err)
      });
    }
  }

}
