import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('../feature/home/home.component'),
    },
    {
        path: 'new-article',
        loadComponent: () => import('../feature/create-article/create-article.component'),
    },
    {
        path: 'settings',
        loadComponent: () => import('../feature/settings/settings.component'),
    },
    {
        path: 'login',
        loadComponent: () => import('../feature/login/login.component'),
    },
    {
        path: 'signup',
        loadComponent: () => import('../feature/signup/signup.component'),
    },
] as Routes;
