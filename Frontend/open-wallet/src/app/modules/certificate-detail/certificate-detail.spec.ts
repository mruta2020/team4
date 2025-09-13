import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDetail } from './certificate-detail';

describe('CertificateDetail', () => {
  let component: CertificateDetail;
  let fixture: ComponentFixture<CertificateDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
