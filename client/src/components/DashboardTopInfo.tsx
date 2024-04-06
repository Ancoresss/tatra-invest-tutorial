"use client";

import { FC, useContext } from "react";
import { StocksMenu } from "./StocksMenu";
import { Separator } from "./ui/separator";
import StockContext from "@/context/StockContext";

interface DashboardTopInfoProps {}

export const DashboardTopInfo: FC<DashboardTopInfoProps> = ({}) => {
  const info = useContext(StockContext);

  console.log("DATA->", info.stock);

  return (
    <div className="flex gap-6">
      <StocksMenu />
      <div className="flex gap-4">
        <span className="text-2xl font-bold">Apple/AAPL</span>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <div className="font-bold flex content-center">
            <div className="mr-2">Price/Currency: </div>
            <span className="text-xl">100/USD</span>
          </div>
          <div>Dividends: 0.23</div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <div>ESP: 1.46</div>
          <div>Revenue: 89.5B</div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <div>Sector: Technology</div>
          <div>Industry: Computers, Phones & Household Electronics</div>
        </div>
      </div>
    </div>
  );
};
