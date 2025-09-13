import {Component, OnInit} from '@angular/core';
import {LogAccessState} from '../../components/log-access-state/log-access-state';
import {DatePipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {LogAccess} from '../../model/log-access.model';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FileSelectEvent, FileUpload, FileUploadEvent} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MOCK_LOGS_ACCESS} from "../../mock/log-access";
import {CertificateService} from "../../services/certificate.service";
import {Router} from '@angular/router';


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
    LogAccessState
  ],
  standalone: true,
  providers: [MessageService,]
})
export class CertificatesComponent implements OnInit {

  certificates = [];
  visible: boolean = false;
  file: File;

  data: LogAccess[];
  constructor(private messageService: MessageService,
              public _router: Router,
              private certificateService: CertificateService) {
  }

  ngOnInit() {
    this.certificateService.getAllCertificate().subscribe((res) => {
      this.certificates = res;
    });

  }

  public showDialog() {
    this.visible = true;
  }

  onUpload(event: FileSelectEvent) {
    console.log(event);
    this.file = event.files[0];
  }

  onUploadFile() {

    console.log("onUploadFile")
    this.certificateService.uploadFile(this.file).subscribe((res) => {

      this.messageService.add({
        severity: 'success', // success, info, warn, error
        summary: 'Success',
        detail: 'File caricato con successo'
      });

      console.log(res);
    });

  }

  download(id) {
    this._router.navigateByUrl('/home/certificate/' + id + '/download')
  }

  showDetail(id) {
    this._router.navigateByUrl('/home/certificate/' + id)
  }
}
