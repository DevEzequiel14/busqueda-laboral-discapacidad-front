import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private url = environment.baseUrl;
  data: any;

  constructor(private requestService: RequestService) { }

  result(formData: any): Observable<any> {
    return this.requestService.post<any>(this.url + 'match/', formData)
  }

  saveData(form: any) {
    this.data = form
  }

  getData() {
    return this.data
  }

  deleteData() {
    this.data = null
  }
}
