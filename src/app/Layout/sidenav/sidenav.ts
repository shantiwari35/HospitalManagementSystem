import { Component, computed, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule, MatDrawerMode } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonService } from '../../Core/Services/common-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeViewType } from '../../Core/Store/Action/viewAction.action';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private readonly commonService = inject(CommonService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly store = inject(Store);

  viewType$ = this.store.select((state: any) => state.view.viewType);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 960px)').pipe(map((state) => state.matches)),
    { initialValue: false }
  );

  readonly drawerMode = computed<MatDrawerMode>(() => (this.isMobile() ? 'over' : 'side'));
  readonly opened = computed(() => this.commonService.isSidenavOpen());

  toggleSidenav(): void {
    this.commonService.toggleSidenavState();
  }

  closeSidenav(): void {
    if (this.isMobile()) {
      this.commonService.closeSidenav();
    }
  }

  toggleViewType(): void {
    this.store.dispatch(changeViewType());
  }
}
