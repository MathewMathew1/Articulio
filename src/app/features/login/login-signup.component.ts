import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/userAuth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginSignupComponent {
  mode: 'login' | 'signup' = 'login'; // switch between login/signup
  form: FormGroup;
  showBenefits = false;

  loading = false;
  errorMsg = '';

  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const repeat = group.get('repeatPassword')?.value;
      return password === repeat || this.mode == "login" ? null : { passwordMismatch: true };
    };
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(64),
          ],
        ],
        repeatPassword: [''],
      },
      {
        validators: this.passwordMatchValidator(),
      }
    );
  }

  switchMode() {
    this.mode = this.mode === 'login' ? 'signup' : 'login';
    this.errorMsg = '';
    this.form.reset();
  }

  submit() {
    console.log(this.form.invalid)
    if (this.form.invalid) return;
    const { email, password } = this.form.value;

    this.loading = true;
    this.errorMsg = '';

    const loggingAction = this.mode === 'login';

    const action =
      this.mode === 'login'
        ? this.auth.login({ email: email!, password: password! })
        : this.auth.signup({ email: email!, password: password! });

    action.subscribe({
      next: () => {
        if (loggingAction) {
          this.router.navigate(['/']);
           window.location.reload();
        } else {
          this.form.reset()
          this.mode = 'login';
        }
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Unexpected error';
        this.loading = false;
      },
    });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  loginWithDiscord() {
    this.auth.loginWithDiscord();
  }
}
