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
  private readonly timePeriods = STOCK_CONSTANT.timePeriods;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public ngOnInit() {
  }

  public fetchQuote() {
    const { symbol, period } = this.stockPickerForm.value;
    if (this.stockPickerForm.valid) {
    this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
