import { CanMatchFn } from '@angular/router'
import { LoginService } from '../services/auth/login.service'
import { inject } from '@angular/core'
import { Roles } from '../services/user/Roles'
import { User } from '../services/user/User'

export const authAdminGuard: CanMatchFn = (route, segments) => {
  const loginService = inject(LoginService)
  const user: User = loginService.loggedUser

  if (user.role === Roles.ADMIN) return true
  return false
}
