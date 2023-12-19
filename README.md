# Real world application built with angular version 17 (Signals)

## Description

This is a real-world application built with Angular version 17. The application allows users to view articles, add comments to posts, follow other users, and mark articles as favorites. It also includes a header with options to add articles and view user profiles.

## Installation
To install and set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd ng-signals-conduit
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    ng serve
    ```

5. Open your browser and visit `http://localhost:4200` to view the application.


## Installation
To install and set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd ng-signals-conduit
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and visit `http://localhost:4200` to view the application.

### TODO
- view article & add comment to the post, follow, favorite options
- add article & profile at header 
- add `@ngrx/signals` store
- tests using jest
- i18n



*tracker*
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

###### Notes
> Reactivity
    - which monitors the changes in the application state and updates the UI accordingly.