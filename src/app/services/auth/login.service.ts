import { Injectable } from '@angular/core'
import { LoginRequest } from './LoginRequest'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { LoginToken } from './LoginToken'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  )
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('')

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('token') != null
    )
    this.currentUserData = new BehaviorSubject<String>(
      sessionStorage.getItem('token') || ''
    )
  }

  login(credentials: LoginRequest): Observable<any> {
    //console.log(credentials)
    return this.http
      .post<any>(environment.apiUrl + '/auth/login', credentials)
      .pipe(
        tap((loginData: LoginToken) => {
          sessionStorage.setItem('token', loginData['token'])
          this.currentUserData.next(loginData['token'])
          this.currentUserLoginOn.next(true)
        }),
        map((loginData: LoginToken) => loginData['token']),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error)
    } else {
      console.error('Status error: %d', error.status, error.error)
    }
    return throwError(() => new Error(error.error['message']))
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable()
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable()
  }

  get userToken(): String {
    return this.currentUserData.value
  }
}
