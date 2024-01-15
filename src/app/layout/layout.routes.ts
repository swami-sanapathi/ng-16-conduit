import { Routes } from '@angular/router';
import { authGuard } from '../shared/services/auth.guard';

export default [
    {
        path: '',
        loadComponent: () => import('../feature/home/home.component'),
        title: 'Home'
    },
    {
        path: 'new-article',
        canMatch: [authGuard('protected')],
        loadComponent: () => import('../feature/create-article/create-article.component'),
        title: 'New Article'
    },
    {
        path: 'settings',
        canMatch: [authGuard('protected')],
        loadComponent: () => import('../feature/settings/settings.component'),
        title: 'Settings'
    },
    {
        path: 'profile/:username',
        canMatch: [authGuard('protected')],
        loadChildren: () => import('../feature/profile/profile.routes')
    },
    {
        path: 'article/:slug',
        canMatch: [authGuard('protected')],
        loadComponent: () => import('../feature/article/article.component')
    },
    {
        path: 'login',
        canMatch: [authGuard('unprotected')],
        loadComponent: () => import('../feature/login/login.component'),
        title: 'Login'
    },
    {
        path: 'signup',
        canMatch: [authGuard('unprotected')],
        loadComponent: () => import('../feature/signup/signup.component'),
        title: 'Signup'
    }
] as Routes;
