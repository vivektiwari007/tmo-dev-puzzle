import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[]
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
export function filterOutPriceQueryResponse(
  response: PriceQueryResponse[],
  fromDate: Date,
  toDate: Date
): PriceQuery[] {
  toDate.setDate(toDate.getDate()+1);
  return transformPriceQueryResponse(response).filter(values => {
      return (
        new Date(values.date) >= fromDate &&
        new Date(values.date) <= toDate)
    });
}
