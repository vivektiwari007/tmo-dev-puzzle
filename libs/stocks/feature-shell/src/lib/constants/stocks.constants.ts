export const STOCK_CONSTANT = {
    timePeriods: [
        { viewValue: 'All available data', value: 'max' },
        { viewValue: 'Five years', value: '5y' },
        { viewValue: 'Two years', value: '2y' },
        { viewValue: 'One year', value: '1y' },
        { viewValue: 'Year-to-date', value: 'ytd' },
        { viewValue: 'Six months', value: '6m' },
        { viewValue: 'Three months', value: '3m' },
        { viewValue: 'One month', value: '1m' }
    ],
    chart : {
        title: '',
        type: 'LineChart',
        data: [],
        columnNames: ['period', 'close'],
        options: { title: `Stock price`, width: '600', height: '400' }
      },
     max : 'max'
};
