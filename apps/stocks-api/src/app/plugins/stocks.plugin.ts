import {environment} from '../../environments/environment';

const fetch = require("node-fetch");

export const stockPlugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {  
      server.route({
        method: 'GET',
        path: '/api/v1/getstocks/{symbol}/chart/{period}',
        options: {
        cors: true,
        handler: async (request, h) => {
            let stocks: any;
            const apiURL: String = `${environment.apiPath}${environment.mainStockAPI}/${request.params.symbol}/chart/${request.params.period}?token=${request.query.token}`;
            const finalcacheKey: String = `${environment.cacheKey}_${request.params.symbol}_${request.params.period}`;
            const cacheValue = await options.cache.get(finalcacheKey);
            if (cacheValue) {
                console.log('Data from Cache for symbol -->',request.params.symbol,'and period -->',request.params.period);
                stocks = cacheValue;
            } else {
                console.log('Data from API Call for symbol -->',request.params.symbol,'and period -->',request.params.period);
                const stockRes = await fetch(apiURL);
                stocks = await stockRes.json();
                await options.cache.put(finalcacheKey, stocks, environment.cacheTimeOut);
            }
            return stocks;
          }
        }
      });
    }
  };
