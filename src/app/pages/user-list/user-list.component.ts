import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { User } from '../../services/user/User'
import { UsersService } from '../../services/user/user.service'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  userList?: User[]

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => (this.userList = data))
  }
}
