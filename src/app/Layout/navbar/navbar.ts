import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
