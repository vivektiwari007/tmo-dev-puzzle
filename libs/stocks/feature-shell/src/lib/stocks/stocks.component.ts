import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { STOCK_CONSTANT } from '../constants/stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stockPickerForm: FormGroup;
  public symbol: string;
  public period: string;
  public quotes$ = this.priceQuery.priceQueries$;
  public readonly chart = STOCK_CONSTANT.chart;
  public todaysDate: Date = new Date();
  public fromDate: Date;
  private readonly timePeriods = STOCK_CONSTANT.timePeriods;
  public disableToDatesPriorToFromDate = (d: Date): boolean => {
    return d >= this.fromDate;
  }

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  public fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, STOCK_CONSTANT.max, fromDate, toDate);
    }
  }

  public dateChangeEvent(event) {
    this.fromDate = event.value;
  }
}
