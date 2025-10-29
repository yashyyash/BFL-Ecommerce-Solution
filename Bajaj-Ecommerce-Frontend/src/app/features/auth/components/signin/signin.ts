import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user-service';

@Component({
  selector: 'bajaj-signin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthUserService);

  signinForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  const credentials = {
    email: this.signinForm.value.email!,
    password: this.signinForm.value.password!
  };

  onSubmit() {
    if (this.signinForm.valid) {
      const credentials = {
        email: this.signinForm.value.email!,
        password: this.signinForm.value.password!
      };

      this._authService.login(credentials).subscribe({
        next: (res: any) => {
          this._authService.setAuth(res.token, res.role);
          console.log('Login successful', res);
        },
        error: err => console.error('Login failed', err)
      });
    }
  }

}
