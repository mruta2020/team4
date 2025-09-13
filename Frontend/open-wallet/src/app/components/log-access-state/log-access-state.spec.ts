import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAccessState } from './log-access-state';

describe('LogAccessState', () => {
  let component: LogAccessState;
  let fixture: ComponentFixture<LogAccessState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAccessState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAccessState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
