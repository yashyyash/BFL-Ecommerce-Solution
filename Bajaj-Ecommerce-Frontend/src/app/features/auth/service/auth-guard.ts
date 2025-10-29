import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from './auth-user-service';

export const authGuard = () => {
  const authService = inject(AuthUserService);
  const router = inject(Router);

  // Check if the user has a token
  if (authService.hasToken()) {
    return true; // Yes, they can access the page
  }

  // No, redirect them to the sign-in page
  return router.parseUrl('/signin');
};