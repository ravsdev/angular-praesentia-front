import { Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './auth/login/login.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'
import { UserComponent } from './pages/user/user.component'
import { UserListComponent } from './pages/user-list/user-list.component'

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
]
