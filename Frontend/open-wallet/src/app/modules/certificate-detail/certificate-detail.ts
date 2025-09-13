import {Component, OnInit} from '@angular/core';
import {Certificate} from "../../model/certificate.model";
import {CertificateService} from "../../services/certificate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgClass} from "@angular/common";
import {Accordion} from "primeng/accordion";
import {Card} from "primeng/card";
import {LabelValue} from "../../components/label-value/label-value";

@Component({
  selector: 'app-certificate-detail',
  imports: [
    DatePipe,
    Accordion,
    Card,
    NgClass,
    LabelValue
  ],
  templateUrl: './certificate-detail.html',
  styleUrl: './certificate-detail.scss'
})
export class CertificateDetail implements OnInit {

  certificate: Certificate;

  constructor(private certificateService: CertificateService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      this.certificateService.getDetail(params['id']).subscribe((res)=>{
        this.certificate = res;
      });


    });
  }

}
