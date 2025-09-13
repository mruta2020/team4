import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAccess } from './log-access';

describe('LogAccess', () => {
  let component: LogAccess;
  let fixture: ComponentFixture<LogAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
