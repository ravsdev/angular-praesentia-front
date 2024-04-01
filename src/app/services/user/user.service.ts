import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { catchError, throwError } from 'rxjs'
import { User } from './User'
import { ApiResponse } from '../../models/alert/apiresponse.model'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http
      .get<User[]>(`${environment.apiUrl}/v1/users`)
      .pipe(catchError(this.handleError))
  }

  public get(id: number) {
    return this.http
      .get<User>(`${environment.apiUrl}/v1/users/${id}`)
      .pipe(catchError(this.handleError))
  }

  public save(user: User) {
    return this.http
      .post<User>(`${environment.apiUrl}/v1/users`, user)
      .pipe(catchError(this.handleError))
  }

  public update(id: number, user: User) {
    return this.http
      .put<User>(`${environment.apiUrl}/v1/users/${id}`, user)
      .pipe(catchError(this.handleError))
  }

  public remove(id: number | undefined) {
    return this.http
      .delete<ApiResponse>(`${environment.apiUrl}/v1/users/${id}`)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error)
    } else {
      console.error('Status error: %d', error.status, error.error)
    }
    return throwError(() => new Error(error.error['message']))
  }
}
