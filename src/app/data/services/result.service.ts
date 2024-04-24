import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private resultsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public result$: Observable<any[]> = this.resultsSubject.asObservable();

  constructor() { }

  updateResults(results: any[]): void {
    this.resultsSubject.next(results);
  }
}
