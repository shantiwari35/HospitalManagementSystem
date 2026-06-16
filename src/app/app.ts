import { Component } from '@angular/core';
import { Sidenav } from "./Layout/sidenav/sidenav";

@Component({
  selector: 'app-root',
  imports: [Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
