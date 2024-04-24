import { ResultService } from './../../data/services/result.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { Offer } from 'src/app/data/model/offer.model';
import { FormService } from 'src/app/data/services/form.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

  increaseFontSize = false;
  offers: Offer[] = [];
  pagedOffers: any[] = [];
  pageSize = 6;
  results$!: Observable<any[]>;
  subscripcion!: Subscription;
  user: any;
  constructor(
    public dialog: MatDialog,
    private resultService: ResultService,
    private formService: FormService
  ) { }
  ngOnInit() {
    this.results$ = this.resultService.result$
    this.subscripcion = this.results$.subscribe(data => {
      this.offers = data
      this.onPageChange({
        pageIndex: 0, pageSize: this.pageSize,
        length: this.offers.length
      });
    });
    this.user = this.formService.getData()
  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
  openDialog(item: any) {
    let requirement = item.requirements
    let tank = item.tasks
    item.increaseFontSize = this.increaseFontSize
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',
      data: item,
    })
    dialogRef.afterClosed().subscribe(result => {
      item.requirements = requirement
      item.tasks = tank
    });
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedOffers = this.offers.slice(startIndex, endIndex);
  }
  increaseLetterSize() {
    this.increaseFontSize = !this.increaseFontSize;
  }
  clearData() {
    this.formService.deleteData()
  }
}
