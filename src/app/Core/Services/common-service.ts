import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {
  readonly toggleSidenav = signal(false);
  readonly isSidenavOpen = this.toggleSidenav;

  toggleSidenavState(): void {
    this.toggleSidenav.update((value) => !value);
  }

  openSidenav(): void {
    this.toggleSidenav.set(true);
  }

  closeSidenav(): void {
    this.toggleSidenav.set(false);
  }
}
