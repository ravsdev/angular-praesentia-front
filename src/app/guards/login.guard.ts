import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { LoginService } from '../services/auth/login.service'

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if (loginService.userLoginOn) return true

  router.navigateByUrl('/login')

  return false
}
