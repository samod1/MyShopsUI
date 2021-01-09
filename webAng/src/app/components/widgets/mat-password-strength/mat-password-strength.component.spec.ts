import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPasswordStrengthComponent } from './mat-password-strength.component';

describe('MatPasswordStrengthComponent', () => {
  let component: MatPasswordStrengthComponent;
  let fixture: ComponentFixture<MatPasswordStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatPasswordStrengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
