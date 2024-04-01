import { Component, OnInit } from '@angular/core'
import { FooterComponent } from '../../shared/footer/footer.component'
import { HeaderComponent } from '../../shared/header/header.component'
import { NavComponent } from '../../shared/nav/nav.component'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { LoginService } from '../../services/auth/login.service'
import { User } from '../../services/user/User'
import { jwtDecode } from 'jwt-decode'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NavComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false
  user?: User
  userList?: User[]

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn
      },
    })
    this.loginService.currentUserData.subscribe({
      next: (userRole) => {
        this.user = jwtDecode<User>(userRole.toString())
      },
    })
    // if (!this.userLoginOn) this.router.navigateByUrl('/login')

    //this.userService.getAll().subscribe((data) => (this.userList = data))
  }
}
