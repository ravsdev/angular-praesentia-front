import { Component } from '@angular/core'
import { LoginService } from '../../services/auth/login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  onLogOut() {
    this.loginService.logout()
    this.router.navigateByUrl('/login')
  }
}
