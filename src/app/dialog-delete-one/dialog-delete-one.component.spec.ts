import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteOneComponent } from './dialog-delete-one.component';

describe('DialogDeleteOneComponent', () => {
  let component: DialogDeleteOneComponent;
  let fixture: ComponentFixture<DialogDeleteOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
