import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Certificate} from "../model/certificate.model";
import {CERTIFICATE_MOCK} from "../mock/certificates.mock";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CertificateService {

  getDetail(id: string): Observable<Certificate> {
    return of(CERTIFICATE_MOCK.find(c => c.id === id))
  }

}
