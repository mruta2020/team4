import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Certificate} from "../model/certificate.model";
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CertificateService {

  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getDetail(id): Observable<any> {
    return this.http.get(`${this.url}/certificates` + id);
  }

  getDownload(id) {
    return this.http.get(`${this.url}/certificates` + id + '/download');
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.url}/certificates`, formData);
  }

  getAllCertificate(){
    return this.http.get<Certificate[]>(`${this.url}/certificates`);
  }

}
