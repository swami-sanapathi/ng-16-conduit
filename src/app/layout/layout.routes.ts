import { Routes } from '@angular/router';
import { authGuard } from '../shared/services/auth.guard';

export default [
    {
        path: '',
        loadComponent: () => import('../feature/home/home.component')
    },
    {
        path: 'new-article',
        canMatch: [authGuard('protected')],
        loadComponent: () => import('../feature/create-article/create-article.component')
    },
    {
        path: 'settings',
        canMatch: [authGuard('protected')],
        loadComponent: () => import('../feature/settings/settings.component')
    },
    {
        path: 'login',
        canMatch: [authGuard('unprotected')],
        loadComponent: () => import('../feature/login/login.component')
    },
    {
        path: 'signup',
        canMatch: [authGuard('unprotected')],
        loadComponent: () => import('../feature/signup/signup.component')
    }
] as Routes;
