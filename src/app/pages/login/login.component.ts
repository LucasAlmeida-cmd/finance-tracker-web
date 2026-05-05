import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { UserResponse } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, RouterLink],
  templateUrl: './login.component.html'
})


export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: UserResponse) => {
          console.log('Login realizado com sucesso!', response);
          localStorage.setItem('user_info', JSON.stringify(response));
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          alert('Falha na autenticação. Verifique seus dados.');
        }
      });
    }
  }
}