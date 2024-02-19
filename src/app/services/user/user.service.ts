import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { tap, catchError, throwError } from 'rxjs'
import { User } from './User'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<User[]>(`${environment.apiUrl}/v1/users`)
      .pipe(catchError(this.handleError))
  }

  get(id: number) {
    return this.http
      .get<User>(`${environment.apiUrl}/v1/users/${id}`)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error)
    } else {
      console.error('Status error: %d', error.status, error.error)
    }
    return throwError(() => new Error(error.error))
  }
}
