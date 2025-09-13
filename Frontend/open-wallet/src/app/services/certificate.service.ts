import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Certificate} from "../model/certificate.model";
import {CERTIFICATE_MOCK} from "../mock/certificates.mock";
import {HttpClient} from "@angular/common/http";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CertificateService {

  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
  }

  getDetail(id: string): Observable<Certificate> {
    return of(CERTIFICATE_MOCK.find(c => c.id === id))
  }

  uploadFile(file: File, alias: string) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('alias', alias);

    return this.http.post(`${this.url}/certificates`, formData);
  }

  getAllCertificate() {
    return this.http.get<Certificate[]>(`${this.url}/certificates`);
  }
}
