"use client";

import React, { FC, ReactNode, useMemo, useState } from "react";
import StockInfo from "@/type/StockInfo";
import { IStock, StockByCountry } from "@/lib/types";
import { getStockByName, getStocksByCountries } from "@/services/stocksService";
import useSWR from "swr";
import {data} from "autoprefixer";

const StockContext = React.createContext<{ currentStock?: IStock }>(
  {} as { stock: StockInfo; currentStock: IStock }
);

export default StockContext;

export const StockProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStockId, setCurrentStockId] = useState<string | undefined>();
  const { data: stocksByCountries } = useSWR<StockByCountry[]>("/stocks-by-countries", () => {
    return getStocksByCountries();
  });
  // stocks by countries
  // call use swr and get data
  // get stock by stock name
  const { data: stockInfo } = useSWR<StockInfo>(currentStockId, async (currentStockId: string) => {
    return currentStock ? getStockByName(currentStockId) : null;
  });

  const currentStock = useMemo(() => {
    return {} as IStock;
  }, [stockInfo, currentStockId]);

  return data ? (
    <StockContext.Provider value={{ currentStock }}>{children}</StockContext.Provider>
  ) : null;
};
export function useStockContext() {
  return React.useContext(StockContext);
}
