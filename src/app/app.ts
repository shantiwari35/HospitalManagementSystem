import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./Layout/navbar/navbar";
import { Sidenav } from "./Layout/sidenav/sidenav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('HospitalManagementSystem');
}
