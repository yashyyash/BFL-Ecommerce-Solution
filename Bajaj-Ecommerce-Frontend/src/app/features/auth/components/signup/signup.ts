import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'bajaj-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private _httpClient = inject(HttpClient);
  private _formBuilder = inject(FormBuilder);

  signupForm = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.signupForm.valid) {
      this._httpClient.post('/api/auth/signup', this.signupForm.value).subscribe({
        next: res => console.log('Signup successful', res),
        error: err => console.error('Signup failed', err)
      });
    }
  }

}
