import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { } 