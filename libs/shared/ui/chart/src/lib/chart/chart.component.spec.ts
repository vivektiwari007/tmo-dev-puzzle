import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { SharedUiChartModule } from '../shared-ui-chart.module';
import { of, Subscription } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiChartModule],
      declarations: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    (component as any).data$ = of();
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should populate chart object', () => {
      (component as any).data$ = of([{ "date": "2020-1-16", "open": 123.45, "close": 234.56 }]);
      component.ngOnInit();
      expect((component as any).subscription).toBeDefined();
    });
  });
  describe('ngOnDestroy()', () => {
    it('should destroy subscription', () => {
      (component as any).subscription = new Subscription();
      spyOn((component as any).subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect((component as any).subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
