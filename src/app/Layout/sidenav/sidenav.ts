import { Component, computed, inject } from '@angular/core';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../Core/Services/common-service';
import { CdkConnectedOverlay } from "@angular/cdk/overlay";
import { CdkObserveContent } from "@angular/cdk/observers";
@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, CdkConnectedOverlay, CdkObserveContent],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
 
  commonService = inject(CommonService);
  opened = computed(() => {
    console.log('Sidenav opened state:', this.commonService.toggleSidenav() );
    return this.commonService.toggleSidenav();
  });
  
  backdropClicked() {
    console.log('Backdrop clicked. Closing sidenav.');
    this.commonService.toggleSidenavState();
  }

  
}
