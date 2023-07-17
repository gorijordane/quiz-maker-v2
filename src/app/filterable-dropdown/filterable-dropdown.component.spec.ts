import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableDropdownComponent } from './filterable-dropdown.component';

describe('FilterableDropdownComponent', () => {
  let component: FilterableDropdownComponent;
  let fixture: ComponentFixture<FilterableDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterableDropdownComponent]
    });
    fixture = TestBed.createComponent(FilterableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
