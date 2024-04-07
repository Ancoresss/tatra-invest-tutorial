"use client";

import { FC, useContext } from "react";
import { StocksMenu } from "./StocksMenu";
import { Separator } from "./ui/separator";
import StockContext from "@/context/StockContext";
import { Button } from "./ui/button";

interface DashboardTopInfoProps {}

export const DashboardTopInfo: FC<DashboardTopInfoProps> = ({}) => {
  const { currentStock, setDaysBack } = useContext(StockContext);

  return (
    <div className="flex gap-6">
      <StocksMenu />
      {currentStock ? (
        <div className="flex grow gap-4">
          <span className="text-2xl font-bold">{currentStock.id ?? "No stock"}</span>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <div className="font-bold flex content-center">
              <div className="mr-2">Price/Currency: </div>
              <span className="text-xl">{currentStock.prices[0].price}/USD</span>
            </div>
            {currentStock.dividends ? <div>Dividends: {currentStock.dividends}</div> : null}
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            {currentStock.eps ? <div>EPS: {currentStock.eps}</div> : null}
            {currentStock.revenue ? <div>Revenue: {currentStock.revenue}</div> : null}
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            {currentStock.sector ? <div>Sector: {currentStock.sector}</div> : null}
            {currentStock.industry ? <div>Industry: {currentStock.industry}</div> : null}
          </div>
          <Button
            onClick={() => setDaysBack?.((prev) => (prev > 0 ? prev - 1 : prev))}
            className="ml-auto"
          >
            Get another day
          </Button>
        </div>
      ) : null}
    </div>
  );
};
