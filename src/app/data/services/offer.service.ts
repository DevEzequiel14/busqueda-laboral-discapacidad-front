import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private url = environment.baseUrl;

  constructor(private requestService: RequestService) { }

  getOffer(): Observable<any> {
    return this.requestService.get(this.url + 'test/')
  }
}
