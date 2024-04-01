import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { NavComponent } from './shared/nav/nav.component'
import { HeaderComponent } from './shared/header/header.component'
import { FooterComponent } from './shared/footer/footer.component'
import { HttpClientModule } from '@angular/common/http'
import { AlertComponent } from './shared/alert/alert.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    AlertComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'praesentia-front-angular'
}
