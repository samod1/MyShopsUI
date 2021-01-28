import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsActlogComponent } from './user-settings-actlog.component';

describe('UserSettingsActlogComponent', () => {
  let component: UserSettingsActlogComponent;
  let fixture: ComponentFixture<UserSettingsActlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsActlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsActlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
