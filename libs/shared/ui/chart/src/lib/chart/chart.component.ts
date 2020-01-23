import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Chart } from '../models/chart.interface';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() public data$: Observable<any>;
  @Input() public chart: Chart;
  public chartData: any;
  private subscription: Subscription;
  constructor(private cd: ChangeDetectorRef) { }

  public ngOnInit() {
    this.subscription = this.data$.subscribe(newData => (this.chartData = newData));
  }
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
