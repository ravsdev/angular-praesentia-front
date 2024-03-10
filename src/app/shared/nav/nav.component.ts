import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LoginService } from '../../services/auth/login.service'
import { jwtDecode } from 'jwt-decode'
import { User } from '../../services/user/User'
import { Roles } from '../../services/user/Roles'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  userLogin?: User
  roles = Roles

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.userLogin = jwtDecode<User>(this.loginService.userToken.toString())
  }
}
