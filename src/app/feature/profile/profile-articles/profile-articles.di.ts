import { InjectionToken, Provider } from '@angular/core';

type ProfileArticlesType = 'my' | 'favourites';

export const PROFILE_ARTICLES = new InjectionToken<ProfileArticlesType>('get the article type');

export function provideProfileArticleType(type: ProfileArticlesType): Provider {
    return { provide: PROFILE_ARTICLES, useValue: type };
}
