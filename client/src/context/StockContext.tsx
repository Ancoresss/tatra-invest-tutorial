"use client";

import { IStock, StockByCountry } from "@/lib/types";
import { getStockByName, getStocksByCountries } from "@/services/stocksService";
import StockInfo from "@/type/StockInfo";
import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";

const StockContext = React.createContext<{
  stocksByCountries?: StockByCountry[];
  currentStock?: IStock;
  setCurrentStockId?: Dispatch<SetStateAction<string | undefined>>;
}>({} as { stock: StockInfo; currentStock: IStock });

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

  useEffect(() => {
    
  }, [currentStock])

  return stocksByCountries ? (
    <StockContext.Provider value={{ currentStock, stocksByCountries, setCurrentStockId }}>
      {children}
    </StockContext.Provider>
  ) : null;
};
export function useStockContext() {
  return React.useContext(StockContext);
}
