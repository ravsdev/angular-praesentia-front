import { Component, OnDestroy, OnInit } from '@angular/core'
import { AlertService } from '../../services/alert/alert.service'
import { Subscription } from 'rxjs'
import { Alert } from '../../models/alert/alert.model'

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertSubscription!: Subscription
  alert?: Alert
  private timer?: number

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe(
      (alert: Alert) => {
        this.alert = alert
        this.timer = setTimeout(() => this.removeAlert(), 5000)
      }
    )
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe()
  }

  removeAlert() {
    clearTimeout(this.timer)
    delete this.alert
  }
}
