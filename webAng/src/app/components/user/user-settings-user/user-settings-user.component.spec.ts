import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsUserComponent } from './user-settings-user.component';

describe('UserSettingsUserComponent', () => {
  let component: UserSettingsUserComponent;
  let fixture: ComponentFixture<UserSettingsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
