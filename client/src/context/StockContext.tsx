import React from 'react';
import useSWR from 'swr'
import StockService from "@/services/invest-api/StockService";

import StockOverview from "../data/stock_AAPL_overview.json"
import StockDividends from "../data/stock_AAPL_dividends.json"
import StockEarnings from "../data/stock_AAPL_earnings.json"
import StockHistoryData from "../data/stock_AAPL_histor_data.json"
import StockProfile from "../data/stock_AAPL_profile.json"
import StockTechnical from "../data/stock_AAPL_technical-analysis.json"


import StockInfo from "@/type/StockInfo";

const StockContext = React.createContext<{stock:StockInfo}>({} as {stock:StockInfo});

export default StockContext;


const dataMapper : StockInfo={
        dividends:StockDividends,
        overview:StockOverview,
        earnings:StockEarnings,
        history_data:StockHistoryData,
        profile:StockProfile,
        technical_analysis:StockTechnical

}

export const StockProvider = ()=>{

    const {data} = useSWR<StockInfo>("/stock", async ()=> {
            const [dividends,overview,earnings,history_data,profile,technical_analysis] =await Promise.all([
                StockService.getStockDividendsByCountryAndSymbol("unites states","AAPL"),
                StockService.getStockOverviewByCountryAndSymbol("unites states","AAPL"),
                StockService.getStockEarningsByCountryAndSymbol("unites states","AAPL"),
                StockService.getStockHistoricalDataByCountryAndSymbol("unites states","AAPL"),
                StockService.getStockProfileByCountryAndSymbol("unites states","AAPL"),
                StockService.getStockTechnicalAnalysisByCountryAndSymbol("unites states","AAPL")])

        return {dividends,overview,earnings,history_data,profile,technical_analysis}
    })

    return data? <StockContext.Provider value={{stock:data}}></StockContext.Provider> : null
}
export function useStockContext() {
    return React.useContext(StockContext);
}