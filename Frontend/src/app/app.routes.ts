import { Routes } from '@angular/router';
import { signupRoutes } from './Signup/signup.routes';

export const routes: Routes = [
    ...signupRoutes,
    {
        path : '',
        pathMatch : 'full',
        redirectTo : 'signup'
    },
    {
        path: '**',
        redirectTo: 'signup'
    }
];
