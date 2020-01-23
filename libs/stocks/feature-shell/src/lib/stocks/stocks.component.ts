import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime } from 'rxjs/operators';
import { STOCK_CONSTANT } from '../constants/stocks.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  public stockPickerForm: FormGroup;
  public symbol: string;
  public period: string;
  public quotes$ = this.priceQuery.priceQueries$;
  public readonly chart = STOCK_CONSTANT.chart;
  private readonly timePeriods = STOCK_CONSTANT.timePeriods;
  private subscription: Subscription;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public ngOnInit() {
    this.subscription = this.stockPickerForm.valueChanges.pipe(debounceTime(400)).subscribe(val => {
      if (this.stockPickerForm.valid) {
        this.fetchQuote();
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public fetchQuote() {
    const { symbol, period } = this.stockPickerForm.value;
    this.priceQuery.fetchQuote(symbol, period);
  }
}
