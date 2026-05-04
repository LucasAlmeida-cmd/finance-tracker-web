import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {
  userName: string = 'Usuário';
  transactions: any[] = []; 

  ngOnInit() {
    const userData = localStorage.getItem('user_info');
    if (userData) {
      this.userName = JSON.parse(userData).nome;
    }
    
    this.loadTransactions();
  }

  loadTransactions() {
    console.log("Buscando transações via Gateway...");
  }
}