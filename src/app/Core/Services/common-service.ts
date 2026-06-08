import { Service, signal } from '@angular/core';

@Service()
export class CommonService {
    
    
    toggleSidenav=signal<boolean>(false);

    toggleSidenavState() {
        this.toggleSidenav.set(!this.toggleSidenav());
    }
}
