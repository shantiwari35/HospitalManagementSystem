import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonService } from '../../Core/Services/common-service';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { changeViewType } from '../../Core/Store/Action/viewAction.action';
@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule,AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  commonService = inject(CommonService);
  store=inject(Store);
  viewType$=this.store.select(state=>state.view.viewType);

  toggleSidenav() {
    console.log('Toggling sidenav. Current state:', this.commonService.toggleSidenav());
    this.commonService.toggleSidenavState();
  }

  toggleViewType(){
    this.store.dispatch(changeViewType());
  }
}
