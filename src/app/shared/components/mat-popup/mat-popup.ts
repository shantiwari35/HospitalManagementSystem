import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type MatPopupVariant = 'info' | 'success' | 'warning' | 'danger';

export interface MatPopupData {
  title: string;
  message: string;
  icon?: string;
  variant?: MatPopupVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  showClose?: boolean;
}

@Component({
  selector: 'app-mat-popup',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './mat-popup.html',
  styleUrl: './mat-popup.scss',
})
export class MatPopupComponent {
  private readonly dialogRef = inject(MatDialogRef<MatPopupComponent>);
  readonly data = inject<MatPopupData>(MAT_DIALOG_DATA);

  readonly variant = computed<MatPopupVariant>(() => this.data.variant ?? 'info');
  readonly icon = computed(() => this.data.icon ?? this.defaultIcon(this.variant()));
  readonly confirmLabel = computed(() => this.data.confirmLabel ?? 'OK');
  readonly cancelLabel = computed(() => this.data.cancelLabel ?? 'Cancel');
  readonly showCancel = computed(() => this.data.showCancel ?? true);
  readonly showClose = computed(() => this.data.showClose ?? true);

  close(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

  confirm(): void {
    this.dialogRef.close({ action: 'confirm' });
  }

  private defaultIcon(variant: MatPopupVariant): string {
    switch (variant) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      case 'info':
      default:
        return 'info';
    }
  }
}
