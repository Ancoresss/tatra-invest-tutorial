"use client";

import { IStock, StockByCountry } from "@/lib/types";
import { getStockByName, getStocksByCountries } from "@/services/stocksService";
import StockInfo from "@/type/StockInfo";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import ProfileContext from "@/context/ProfileContext";

const StockContext = React.createContext<{
  stocksByCountries?: StockByCountry[];
  currentStock?: IStock;
  setCurrentStockId?: Dispatch<SetStateAction<string | undefined>>;
  setDaysBack?: Dispatch<SetStateAction<number>>;
}>({});

export default StockContext;

export const StockProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const profileInfo = useContext(ProfileContext);

  const [daysBack, setDaysBack] = useState<number>(15);
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
    [currentStockId, daysBack],
    async ([currentStockId, daysBack]: [string, number]) => {
      console.log(currentStockId, daysBack);
      return currentStockId ? getStockByName(currentStockId, daysBack) : undefined;
    }
  );

  useEffect(() => {
    profileInfo.profileData?.stocks.map((s) => {
      if (!s.plannedAction) {
        return;
      } else {
        if (s.plannedAction.type == "date") {
          // date action

          if (s.plannedAction.transactionType == "buy") {
            //   buy logic
          } else {
            //   sell logic
          }
        } else {
          //   price logic
        }
      }
    });
  }, [currentStock]);

  return stocksByCountries ? (
    <StockContext.Provider
      value={{ currentStock, stocksByCountries, setCurrentStockId, setDaysBack }}
    >
      {children}
    </StockContext.Provider>
  ) : null;
};
export function useStockContext() {
  return React.useContext(StockContext);
}
