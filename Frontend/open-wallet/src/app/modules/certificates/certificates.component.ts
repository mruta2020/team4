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
import {TranslatePipe} from "@ngx-translate/core";
import {Router} from '@angular/router';
import {LogAccess} from "../../model/log-access.model";
import { Certificate } from '../../model/certificate.model';


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
    LogAccessState,
    TranslatePipe
  ],
  standalone: true,
  providers: [MessageService,]
})
export class CertificatesComponent implements OnInit {

  alias: string;
  certificates = [];
  visible: boolean = false;
  file: File;

  selectedCertificate!: Certificate;
  metaKey: boolean = true;

  data: LogAccess[];

  constructor(private messageService: MessageService,
              public _router: Router,
              private certificateService: CertificateService) {
  }

  ngOnInit() {
    this._init();
  }

  public showDialog() {
    this.visible = true;
  }

  onUpload(event: FileSelectEvent) {
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

      this._init();

      this.visible = false;
      console.log(res);
    });
  }

  public selectCertificate(cert: Certificate) {
    console.log('cert',cert)
  }

  download(id) {
    this._router.navigateByUrl('/home/certificate/' + id + '/download')
  }

  showDetail(id) {
    this._router.navigateByUrl('/home/certificate/' + id)
  }

  private _init(){
    this.certificateService.getAllCertificate().subscribe((res) => {
      this.certificates = res;
    });
  }
}
