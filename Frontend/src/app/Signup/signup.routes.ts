import {Routes} from '@angular/router';

export const signupRoutes : Routes = [
    {
        path: 'signup',
        pathMatch : 'full',
        loadComponent:()=> import('./signup').then(comp=> comp.Signup)
    }
]