import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  features = [
    {
      title: 'Productos de Calidad',
      description: 'Ofrecemos solo los mejores productos de las marcas más reconocidas.',
      icon: 'star'
    },
    {
      title: 'Envío Rápido',
      description: 'Entregamos tus pedidos en tiempo récord a cualquier parte del país.',
      icon: 'local_shipping'
    },
    {
      title: 'Atención al Cliente',
      description: 'Nuestro equipo está disponible 24/7 para ayudarte con cualquier consulta.',
      icon: 'support_agent'
    },
    {
      title: 'Garantía',
      description: 'Todos nuestros productos cuentan con garantía extendida.',
      icon: 'verified'
    }
  ];

  team = [
    {
      name: 'Juan Pérez',
      role: 'CEO',
      image: 'assets/images/team/ceo.jpg'
    },
    {
      name: 'María García',
      role: 'Directora de Marketing',
      image: 'assets/images/team/marketing.jpg'
    },
    {
      name: 'Carlos López',
      role: 'Director de Operaciones',
      image: 'assets/images/team/operations.jpg'
    }
  ];
} 