import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-shell',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  templateUrl: './form-shell.html',
  styleUrl: './form-shell.scss',
})
export class FormShellComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly formGroup = input.required<FormGroup>();
  readonly submitLabel = input('Save');
  readonly cancelLabel = input('Cancel');
  readonly isSubmitting = input(false);
  readonly disableSubmit = input(false);
  readonly showDefaultActions = input(true);

  readonly submitted = output<void>();
  readonly cancelled = output<void>();

  readonly isSubmitDisabled = computed(() => this.isSubmitting() || this.disableSubmit() || this.formGroup().invalid);
}
