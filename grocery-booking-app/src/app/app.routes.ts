import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
    },
    {
        path: 'user',
        loadComponent: () => import('../app/pages/user/user.component').then(mod => mod.UserComponent),
        title: 'User Dashboard'
    },
    {
        path: 'admin',
        loadComponent: () => import('../app/pages/admin/admin.component').then(mod => mod.AdminComponent),
        title: 'Admin Dashboard'
    },
    {
        path: '**',
        loadComponent: () => import('../app/common/page-not-found/page-not-found.component').then(mod => mod.PageNotFoundComponent)
    }
];
