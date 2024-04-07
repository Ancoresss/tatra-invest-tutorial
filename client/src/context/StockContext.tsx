"use client";

import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
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
  useEffect(() => {
    if (!stocksByCountries?.length) return;
    setCurrentStockId(stocksByCountries[0].name);
  }, [stocksByCountries]);
  // stocks by countries
  // call use swr and get data
  // get stock by stock name
  const { data: currentStock } = useSWR<IStock | undefined>(
    currentStockId,
    async (currentStockId: string) => {
      return currentStockId ? getStockByName(currentStockId) : undefined;
    }
  );

  return stocksByCountries ? (
    <StockContext.Provider value={{ currentStock }}>{children}</StockContext.Provider>
  ) : null;
};
export function useStockContext() {
  return React.useContext(StockContext);
}
