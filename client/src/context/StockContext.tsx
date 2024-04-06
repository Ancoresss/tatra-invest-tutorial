"use client";

import React, { FC, ReactNode } from "react";
import useSWR from "swr";

import StockAAPLOverview from "../data/stock_APPL/stock_AAPL_overview.json";
import StockAAPLDividends from "../data/stock_APPL/stock_AAPL_dividends.json";
import StockAAPLEarnings from "../data/stock_APPL/stock_AAPL_earnings.json";
import StockAAPLHistoryData from "../data/stock_APPL/stock_AAPL_histor_data.json";
import StockAAPLProfile from "../data/stock_APPL/stock_AAPL_profile.json";
import StockAAPLTechnical from "../data/stock_APPL/stock_AAPL_technical-analysis.json";

import StockInfo from "@/type/StockInfo";
import StockService from "@/services/invest-api/StockService";

const StockContext = React.createContext<{ stock: StockInfo }>({} as { stock: StockInfo });

export default StockContext;

const dataMapper: StockInfo = {
  dividends: StockAAPLDividends,
  overview: StockAAPLOverview,
  earnings: StockAAPLEarnings,
  history_data: StockAAPLHistoryData,
  profile: StockAAPLProfile,
  technical_analysis: StockAAPLTechnical,
};

export const StockProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const { data } = useSWR<StockInfo>("/stock", async () => {
  // const [dividends, overview, earnings, history_data, profile, technical_analysis] =
  //   await Promise.all([
  //     StockService.getStockDividendsByCountryAndSymbol("unites states", "AAPL"),
  //     StockService.getStockOverviewByCountryAndSymbol("unites states", "AAPL"),
  //     StockService.getStockEarningsByCountryAndSymbol("unites states", "AAPL"),
  //     StockService.getStockHistoricalDataByCountryAndSymbol("unites states", "AAPL"),
  //     StockService.getStockProfileByCountryAndSymbol("unites states", "AAPL"),
  //     StockService.getStockTechnicalAnalysisByCountryAndSymbol("unites states", "AAPL"),
  //   ]);

  // return { dividends, overview, earnings, history_data, profile, technical_analysis };
  // return {}
  // });

  return dataMapper ? (
      <StockContext.Provider value={{ stock: dataMapper }}>{children}</StockContext.Provider>
  ) : null;
};
export function useStockContext() {
  return React.useContext(StockContext);
}