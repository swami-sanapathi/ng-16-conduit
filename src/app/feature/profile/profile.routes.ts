import { Routes } from '@angular/router';
import { provideProfileArticleType } from './profile-articles/profile-articles.di';

export default [
    {
        path: '',
        loadComponent: () => import('./profile.component'),
        children: [
            {
                path: '',
                providers: [provideProfileArticleType('my')],
                loadComponent: () => import('./profile-articles/profile-articles.component')
            },
            {
                path: 'favourites',
                providers: [provideProfileArticleType('favourites')],
                loadComponent: () => import('./profile-articles/profile-articles.component')
            }
        ]
    }
] as Routes;
