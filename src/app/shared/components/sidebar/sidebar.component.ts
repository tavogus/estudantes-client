import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  menuItems = [
    {
      title: 'Administração',
      icon: 'fas fa-cogs',
      subItems: [
        { title: 'Escola', path: '/escolas', icon: 'fas fa-school' },
        { title: 'Novo Aluno', path: '/alunos/novo', icon: 'fas fa-user-plus' }
      ]
    }
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }
} 