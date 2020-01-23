import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';
class MockPriceQueriesFacade {
  selectedSymbol$ = of();
  priceQueries$ = of();
  fetchQuote = jest.fn()
}
describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StocksFeatureShellModule,
        NoopAnimationsModule
      ],
      declarations: [],
      providers: [
        { provide: PriceQueryFacade, useClass: MockPriceQueriesFacade }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = TestBed.get(PriceQueryFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('fetchQuote()', () => {
    it('should call fetch quote of facade file', () => {
      component.stockPickerForm.setValue({ symbol: 'GOOGL', period: '1y' });
      spyOn(priceQueryFacade, 'fetchQuote');
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalled();
    });
  });
});
