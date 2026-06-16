import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPopupComponent, MatPopupData } from '../components/mat-popup/mat-popup';

@Injectable({ providedIn: 'root' })
export class MatPopupService {
  private readonly dialog = inject(MatDialog);

  open(data: MatPopupData, config?: MatDialogConfig): ReturnType<MatDialog['open']> {
    return this.dialog.open(MatPopupComponent, {
      width: '100%',
      maxWidth: '480px',
      autoFocus: false,
      restoreFocus: true,
      ...config,
      data,
    });
  }

  confirm(message: string, title = 'Confirm action') {
    return this.open({
      title,
      message,
      variant: 'warning',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      showCancel: true,
      icon: 'help',
    });
  }

  alert(message: string, title = 'Message') {
    return this.open({
      title,
      message,
      variant: 'info',
      confirmLabel: 'Close',
      showCancel: false,
      icon: 'info',
    });
  }
}
