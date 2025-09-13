import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Certificate} from "../model/certificate.model";
import {CERTIFICATE_MOCK} from "../mock/certificates.mock";
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CertificateService {

  constructor(private httpService: HttpClient) { }

  getDetail(id): Observable<any> {
    return this.httpService.get(ENDPOINT + id);
  }


  getList(): Observable<any> {
    return this.httpService.get(ENDPOINT);
  }

  getDownload(id) {
    return this.httpService.get(ENDPOINT + id + '/download');
  }

}
const ENDPOINT = 'localhost:3000/certificate/';

