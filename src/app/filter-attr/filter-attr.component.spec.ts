import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAttrComponent } from './filter-attr.component';

describe('FilterAttrComponent', () => {
  let component: FilterAttrComponent;
  let fixture: ComponentFixture<FilterAttrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAttrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
