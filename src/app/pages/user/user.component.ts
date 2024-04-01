import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../../services/user/user.service'
import { User } from '../../services/user/User'
import { Roles } from '../../services/user/Roles'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LoginService } from '../../services/auth/login.service'
import { jwtDecode } from 'jwt-decode'
import { AlertComponent } from '../../shared/alert/alert.component'
import { AlertService } from '../../services/alert/alert.service'
import { catchError } from 'rxjs'

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute)
  userLogin?: User
  user?: User
  roles = Roles
  userForm!: FormGroup
  //alert?: string
  // enabledCheckBox: boolean = true

  constructor(
    private router: Router,
    private userService: UsersService,
    private loginService: LoginService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userLogin = jwtDecode<User>(this.loginService.userToken.toString())

    this.userForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      enabled: new FormControl(false),
    })

    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
      this.userService.get(id).subscribe((data) => {
        if (data) {
          this.user = data
          this.user.id = id
          this.userForm.get('firstname')?.setValue(this.user.firstname)
          this.userForm.get('lastname')?.setValue(this.user.lastname)
          this.userForm.get('dni')?.setValue(this.user.dni)
          this.userForm.get('email')?.setValue(this.user.email)
          this.userForm.get('role')?.setValue(this.user.role)
          this.userForm.get('enabled')?.setValue(this.user.enabled)
        }
      })
    }
  }

  public getRoles(): typeof Roles {
    return Roles
  }

  public onRemove(): void {
    this.userService.remove(this.user?.id).subscribe({
      error: (err) => {
        //console.log(err)
        this.alertService.error(err)
      },
      complete: () => {
        this.alertService.success('Borrado con éxito')
        this.router.navigate(['../'], { relativeTo: this.route })
      },
    })
  }

  public onSave(): void {
    if (this.user?.id !== undefined)
      this.userService.update(this.user.id, this.userForm.value).subscribe({
        error: (err) => {
          //console.log(err)
          this.alertService.error(err)
        },
        complete: () => {
          //console.log('updated')
          this.alertService.success('Guardado con éxito')
        },
      })
    else
      this.userService.save(this.userForm.value).subscribe({
        error: (err) => {
          //console.log(err)
          this.alertService.error(err)
        },
        complete: () => {
          //console.log('updated')
          this.alertService.success('Usuario creado con éxito')
          this.router.navigate(['../'], { relativeTo: this.route })
        },
      })
  }
}
