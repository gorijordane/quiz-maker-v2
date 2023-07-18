import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BoldPipe } from '../pipes/bold.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filterable-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, BoldPipe],
  templateUrl: './filterable-dropdown.component.html',
  styleUrls: ['./filterable-dropdown.component.css']
})
export class FilterableDropdownComponent implements OnInit {

  @Input() data: string[] = [];

  @Input() placeHolder = "";

  @Input() filterValue = "";

  @Output() dataSelected = new EventEmitter<string>();

  filteredData: string[] = [];

  displayData = false;

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (this.displayData && !this.ref.nativeElement.contains(event.target)) {
      this.click(this.filterValue);
      this.displayData = false;
    }
  }

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this.filter(this.filterValue);
  }

  filter(filterValue: string) {
    this.filteredData = this.data.filter(d => d.search(new RegExp(filterValue, 'i')) !== -1);
  }

  click(data: string) {
    this.filterValue = data;
    this.filter(data);
    this.displayData = false;
    this.dataSelected.emit(data);
  }
}
