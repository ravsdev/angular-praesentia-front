import { Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './auth/login/login.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'
import { UserComponent } from './pages/user/user.component'
import { UserListComponent } from './pages/user-list/user-list.component'
import { authAdminGuard } from './guards/auth-admin.guard'
import { loginGuard } from './guards/login.guard'

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [authAdminGuard],
      },
      {
        path: 'users/new',
        component: UserComponent,
        canActivate: [authAdminGuard],
      },
      { path: 'users/:id', component: UserComponent },
    ],
    canActivate: [loginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
]
