import {API_URL, Token} from "@/services/ApiData";

const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': Token,
    'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
};


const getListOfStocksByCountries = async (country:string)=>
    await fetch(`${API_URL}/stock/list-stock-by-country`,
        {method: "POST", headers, body: JSON.stringify({country: country}) })
        .then((res:Response)=>{
    return res.json();
}).catch((err)=>{
    console.warn(err)
});
const getListOfStocksMostActiveByCountry = async (country:string)=>
    await fetch(`${API_URL}/stock/most-active-price`,
        {method: "POST", headers, body: JSON.stringify({country: country}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });

const getListOfStocksTopGainersPriceByCountry = async (country:string)=>
    await fetch(`${API_URL}/stock/stock-gainers-price`,
        {method: "POST", headers, body: JSON.stringify({country: country}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });


const getListOfStocksTopLoosersPriceByCountry = async (country:string)=>
    await fetch(`${API_URL}/stock/stock-losers-price`,
        {method: "POST", headers, body: JSON.stringify({country: country}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });

const getListOfStocksMostActiveStocksPriceByCountry = async (country:string)=>
    await fetch(`${API_URL}/stock/most-active-price`,
        {method: "POST", headers, body: JSON.stringify({country: country}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });


const getStockProfileByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/profile`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
        return res.json();
    }).catch((err)=>{
        console.warn(err)
    });

// last hitstorical object, actual
const getStockOverviewByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/overview`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });

const getStockHistoricalDataByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/historical-data`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });

const getStockDividendsByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/dividends`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });

const getStockEarningsByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/earnings`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });


// 'moving averages': [ [Object], [Object], [Object], [Object], [Object], [Object] ],
//     'pivot points': [ [Object], [Object] ],
//     'technical indicators': [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ]
//   },
const getStockTechnicalAnalysisByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/technical-analysis`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });


//  data: {
//     balance_sheet: [ [Object], [Object], [Object] ],
//     cash_flow: [ [Object], [Object], [Object], [Object] ],
//     income_statement: [ [Object], [Object], [Object], [Object] ]
//   },
const getStockFinancialSummaryByCountryAndSymbol = async (country:string,symbol:string)=>
    await fetch(`${API_URL}/stock/financial-summary`,
        {method: "POST", headers, body: JSON.stringify({country: country, symbol: symbol}) })
        .then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });




const StockService = {
    getListOfStocksByCountries,
    getListOfStocksMostActiveByCountry,
    getListOfStocksTopGainersPriceByCountry,
    getListOfStocksTopLoosersPriceByCountry,
    getListOfStocksMostActiveStocksPriceByCountry,
    getStockProfileByCountryAndSymbol,
    getStockOverviewByCountryAndSymbol,
    getStockHistoricalDataByCountryAndSymbol,
    getStockDividendsByCountryAndSymbol,
    getStockEarningsByCountryAndSymbol,
    getStockFinancialSummaryByCountryAndSymbol,
    getStockTechnicalAnalysisByCountryAndSymbol


};

export default StockService;
