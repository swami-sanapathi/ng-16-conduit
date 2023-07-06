# Ng16Conduit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


### TODO
- view article & add comment to the post, follow, favourite options
- add article & profile at header 
- add `NgRx` component store
- tests using jest
- i18n



###### Org Project Migrations
> Standalone Migartion
- @auth0/angular-jwt angular 15 support available
    [with modules support](https://github.com/auth0/angular2-jwt/pull/772/files) 
    - standalone migration not yet available [discussion](https://github.com/auth0/angular2-jwt/issues/770#issuecomment-1535894033)

- @azure/msal-angular [with modules support](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5988)
    - standalone migration not yet available [discussion](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5988)

- @balkangraph/orgchart.js [with modules support also not available](https://github.com/BALKANGraph/OrgChartJS/issues/768) 
    - opened an issue
    - standalone migration not yet available [discussion](https://github.com/BALKANGraph/OrgChartJS/issues/768)

- @fullcalendar/angular angular 15 support available
    - [open issue](https://github.com/fullcalendar/fullcalendar/issues/7395)