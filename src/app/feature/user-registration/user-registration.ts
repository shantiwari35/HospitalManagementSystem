import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface PasswordStrength {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
}

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss',
})
export class UserRegistrationComponent {
  registrationForm!: FormGroup;
  isLoading = signal(false);
  passwordStrength = signal<PasswordStrength>({
    score: 0,
    level: 'weak',
    feedback: [],
  });
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  agreedToTerms = signal(false);

  readonly userRoles = [
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor/Staff' },
    { value: 'admin', label: 'Administrator' },
  ];

  readonly specializations = [
    'Cardiology',
    'Dermatology',
    'General Practice',
    'Internal Medicine',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Surgery',
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.fb.group(
      {
        // Common fields
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)]],
        dateOfBirth: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        userRole: ['patient', Validators.required],
        agreedToTerms: [false, Validators.requiredTrue],

        // Patient fields
        insuranceId: [''],
        emergencyContact: [''],
        emergencyPhone: [''],

        // Doctor fields
        licenseNumber: [''],
        specialization: [''],
        department: [''],

        // Admin fields
        employeeId: [''],
      },
      {
        validators: this.passwordMatchValidator(),
      }
    );

    // Watch password field for strength calculation
    this.registrationForm.get('password')?.valueChanges.subscribe((value) => {
      if (value) {
        this.passwordStrength.set(this.calculatePasswordStrength(value));
      }
    });

    // Watch userRole to update field requirements
    this.registrationForm.get('userRole')?.valueChanges.subscribe((role) => {
      this.updateFieldRequirements(role);
    });
  }

  private passwordMatchValidator() {
    return (group: AbstractControl) => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  private updateFieldRequirements(role: string): void {
    const form = this.registrationForm;

    // Reset all role-specific fields
    form.get('insuranceId')?.clearAsyncValidators();
    form.get('licenseNumber')?.clearAsyncValidators();
    form.get('employeeId')?.clearAsyncValidators();
    form.get('specialization')?.clearAsyncValidators();
    form.get('department')?.clearAsyncValidators();

    form.get('insuranceId')?.setValidators([]);
    form.get('licenseNumber')?.setValidators([]);
    form.get('employeeId')?.setValidators([]);
    form.get('specialization')?.setValidators([]);
    form.get('department')?.setValidators([]);

    switch (role) {
      case 'patient':
        form.get('insuranceId')?.setValidators([Validators.minLength(5)]);
        form.get('emergencyContact')?.setValidators([Validators.minLength(2)]);
        form.get('emergencyPhone')?.setValidators([Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)]);
        break;
      case 'doctor':
        form.get('licenseNumber')?.setValidators([Validators.required, Validators.minLength(5)]);
        form.get('specialization')?.setValidators([Validators.required]);
        form.get('department')?.setValidators([Validators.required]);
        break;
      case 'admin':
        form.get('employeeId')?.setValidators([Validators.required, Validators.minLength(4)]);
        form.get('department')?.setValidators([Validators.required]);
        break;
    }

    form.get('insuranceId')?.updateValueAndValidity();
    form.get('licenseNumber')?.updateValueAndValidity();
    form.get('employeeId')?.updateValueAndValidity();
    form.get('specialization')?.updateValueAndValidity();
    form.get('department')?.updateValueAndValidity();
    form.get('emergencyContact')?.updateValueAndValidity();
    form.get('emergencyPhone')?.updateValueAndValidity();
  }

  private calculatePasswordStrength(password: string): PasswordStrength {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score < 2) feedback.push('Use a mix of uppercase and lowercase letters');
    if (!/[0-9]/.test(password)) feedback.push('Add at least one number');
    if (!/[!@#$%^&*]/.test(password)) feedback.push('Add a special character (!@#$%^&*)');

    let level: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    if (score >= 5) level = 'strong';
    else if (score >= 4) level = 'good';
    else if (score >= 2) level = 'fair';

    return { score, level, feedback };
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((val) => !val);
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword.update((val) => !val);
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 5000 });
      return;
    }

    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      const formData = this.registrationForm.value;
      console.log('Registration Data:', formData);
      this.snackBar.open('Registration successful!', 'Close', { duration: 5000 });
      this.isLoading.set(false);
      this.registrationForm.reset();
    }, 2000);
  }

  onReset(): void {
    this.registrationForm.reset();
    this.passwordStrength.set({ score: 0, level: 'weak', feedback: [] });
  }

  getFieldError(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return `${fieldName} is required`;
    if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['email']) return 'Please enter a valid email';
    if (field.errors['pattern']) return `Invalid ${fieldName} format`;

    return 'Invalid input';
  }
}
