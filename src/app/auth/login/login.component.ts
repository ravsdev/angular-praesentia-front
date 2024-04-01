import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { LoginService } from '../../services/auth/login.service'
import { LoginRequest } from '../../services/auth/LoginRequest'
import { Router } from '@angular/router'
import { AlertService } from '../../services/alert/alert.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loginError: string = ''

  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })

    //if(this.loginService.currentUserLoginOn) this.router.navigateByUrl('/home')
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginError = ''
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (value) => {
          //console.log(value)
        },
        error: (err) => {
          console.log(err)
          //this.loginError = err
          this.alertService.error(err)
        },
        complete: () => {
          this.router.navigateByUrl('/home')
          this.loginForm.reset()
        },
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

  get email() {
    return this.loginForm.controls['email']
  }
  get password() {
    return this.loginForm.controls['password']
  }
}
