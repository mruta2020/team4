import { Component, OnInit } from '@angular/core';
import { LogAccessState } from '../../components/log-access-state/log-access-state';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MOCK_LOGS_ACCESS } from '../../mock/certificate.mock';
import { LogAccess } from '../../model/log-access.model';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
  imports: [
    DatePipe,
    LogAccessState,
    TableModule,
    ButtonModule,
    Dialog,
    FileUpload,
    ToastModule
  ],
  standalone: true,
  providers: [MessageService, ]
})
export class CertificatesComponent implements OnInit {
  visible: boolean = false;

  data: LogAccess[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.data = MOCK_LOGS_ACCESS.splice(0, 5);
  }

  public showDialog() {
    this.visible = true;
  }

  onUpload(event: FileUploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File caricato con successo' });
  }
}
