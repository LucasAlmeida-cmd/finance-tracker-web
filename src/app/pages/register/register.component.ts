import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      dataAniversario: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const dadosParaEnviar = { ...this.registerForm.value };
    
      if (dadosParaEnviar.dataAniversario) {
        const [ano, mes, dia] = dadosParaEnviar.dataAniversario.split('-');
        dadosParaEnviar.dataAniversario = `${dia}/${mes}/${ano}`;
      }

      
      this.authService.register(dadosParaEnviar).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso!', response);
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Erro ao fazer cadastro:', err);
          alert('Falha no cadastro. Verifique seus dados.');
        }
      });
    }
  }
}