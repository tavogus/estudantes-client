import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSelectModule]
})
export class FilterModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Filtros';
  @Input() filters: any = {};
  @Output() filtersChange = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  onClose(): void {
    this.close.emit();
  }

  onApply(): void {
    this.apply.emit(this.filters);
  }

  onClear(): void {
    this.filters = {};
    this.apply.emit(this.filters);
  }
} 