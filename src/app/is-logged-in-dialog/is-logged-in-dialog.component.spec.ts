import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsLoggedInDialogComponent } from './is-logged-in-dialog.component';

describe('IsLoggedInDialogComponent', () => {
  let component: IsLoggedInDialogComponent;
  let fixture: ComponentFixture<IsLoggedInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsLoggedInDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsLoggedInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
