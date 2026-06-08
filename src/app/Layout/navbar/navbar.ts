import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonService } from '../../Core/Services/common-service';
@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  commonService = inject(CommonService);

  toggleSidenav() {
    console.log('Toggling sidenav. Current state:', this.commonService.toggleSidenav());
    this.commonService.toggleSidenavState();
  }
}
