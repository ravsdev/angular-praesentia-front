import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../../services/user/user.service'
import { User } from '../../services/user/User'

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute)
  user?: User

  constructor(private router: Router, private userService: UsersService) {}
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.userService.get(id).subscribe((data) => (this.user = data))
  }
}
