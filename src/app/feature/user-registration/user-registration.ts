import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms';
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
import { UserService } from '../../Core/Services/user-service';
import { TextFormatPipe } from '../../shared/pipe/text-format-pipe';
import { Store } from '@ngrx/store';
import { loadRoles, saveUser } from '../../Core/Store/Action/userAction.action';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    TextFormatPipe,
  ],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss',
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  private store = inject(Store);
  private destroy$ = new Subject();
  private activatedRoutes = inject(ActivatedRoute);

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

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
  id=signal<any>('');

  userRoles = this.store.select((state: any) => state.users.roles);
  
  response$ = this.store.select((state: any) => state.users);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
  
    this.store.dispatch(loadRoles());
    this.response$
      .pipe(
        tap((res) => console.log(res)),
        takeUntil(this.destroy$),
      )
      .subscribe((res: any) => {
        if (!res.loading) {
          this.isLoading.set(false);
          if (res.response && (res.response.status === 201 || res.response.status===200)) {
            this.snackBar.open(res.response.status === 201?'Registration successful!':'Updation successful!', 'Close', { duration: 5000 });
            this.onReset();
          } else if (res.error) {
            this.snackBar.open(`Registration failed: ${res.error}`, 'Close', { duration: 5000 });
          }
        }
      });

    this.activatedRoutes.params.subscribe((id) => {
      this.id.set(id?.['id']);
      
      if (this.id()) {
      this.fetchUserData(this.id());
    }
    });
  }

  private initializeForm(): void {
    this.registrationForm = this.fb.group(
      {
        // Common fields
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/),
          ],
        ],
        dateOfBirth: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        userRole: ['', Validators.required],
        agreedToTerms: [false, Validators.required],
      },
      {
        validators: this.passwordMatchValidator(),
      },
    );

    // Watch password field for strength calculation
    this.registrationForm.get('password')?.valueChanges.subscribe((value) => {
      if (value) {
        this.passwordStrength.set(this.calculatePasswordStrength(value));
      }
    });
  }
  get fullName() {
    const firstName = this.registrationForm.get('firstName')?.value || '';
    const lastName = this.registrationForm.get('lastName')?.value || '';
    return `${firstName} ${lastName}`.trim();
  }
  private passwordMatchValidator() {
    return (group: AbstractControl) => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
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
    const formData = this.registrationForm.value;
    
    const userData = {
      id:this.id()?this.id():'',
      fullName: this.fullName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      password: formData.password,
      role: formData.userRole,
      agreedToTermsOfUse: formData.agreedToTerms,
    };
   
    this.store.dispatch(saveUser({ userData }));
  }

  onReset(): void {
    this.registrationForm.reset();
    this.formDirective.resetForm();
    this.passwordStrength.set({ score: 0, level: 'weak', feedback: [] });
  }

  getFieldError(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return `${fieldName} is required`;
    if (field.errors['minlength'])
      return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['email']) return 'Please enter a valid email';
    if (field.errors['pattern']) return `Invalid ${fieldName} format`;

    return 'Invalid input';
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  fetchUserData(id: any) {
    this.userService
      .getUserById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data)
        const [firstName, lastName] =data?.data.fullName.split(' ');

        this.registrationForm.patchValue({
          ...data.data,
          firstName,
          lastName,
          userRole: data.data.role,
        });
      });
  }
}
