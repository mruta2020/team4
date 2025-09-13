import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FileSelectEvent, FileUpload, FileUploadEvent} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {CertificateService} from "../../services/certificate.service";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {FloatLabel} from "primeng/floatlabel";
import {LogAccessState} from "../../components/log-access-state/log-access-state";


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
  imports: [
    TableModule,
    ButtonModule,
    Dialog,
    FileUpload,
    ToastModule,
    FormsModule,
    InputText,
    FloatLabel,
    ToastModule,
    LogAccessState
  ],
  standalone: true,
})
export class CertificatesComponent implements OnInit {

  alias: string;
  certificates = [];
  visible: boolean = false;
  file: File;

  constructor(private messageService: MessageService,
              private certificateService: CertificateService) {
  }

  ngOnInit() {

    this.certificateService.getAllCertificate().subscribe((res) => {
      this.certificates = res;
    });

  }

  public showDialog() {
    console.log(this.file);
    this.visible = true;
  }

  onUpload(event: FileSelectEvent) {
    console.log(event);
    this.file = event.files[0];
  }

  onUploadFile() {

    console.log(this.file);

    this.certificateService.uploadFile(this.file, this.alias).subscribe((res) => {

      this.messageService.add({
        severity: 'success', // success, info, warn, error
        summary: 'Success',
        detail: 'File caricato con successo'
      });

      console.log(res);
    });

  }
}
