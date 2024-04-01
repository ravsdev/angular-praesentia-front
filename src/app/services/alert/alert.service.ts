import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { Alert, AlertType } from '../../models/alert/alert.model'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alert$: Subject<Alert> = new Subject<Alert>()

  constructor() {}

  get alert$(): Observable<Alert> {
    return this._alert$.asObservable()
  }

  success(text: string) {
    this.setAlert(new Alert({ message: text, type: AlertType.Success }))
  }

  error(text: string) {
    this.setAlert(new Alert({ message: text, type: AlertType.Error }))
  }

  setAlert(alert: Alert) {
    this._alert$.next(alert)
  }
}
