"use client"

import {FC, useContext} from "react";
import {StocksMenu} from "./StocksMenu";
import {Separator} from "./ui/separator";
import StockContext from "@/context/StockContext";

interface DashboardTopInfoProps {
}

export const DashboardTopInfo: FC<DashboardTopInfoProps> = ({}) => {
    const info = useContext(StockContext);

    console.log("DATA->", info.stock);

    return (
        <div className="relative mr-4">
            <div className="flex ">
                <StocksMenu/>
                <div className="flex">
                    <div className="m-auto ml-5 mr-5 text-2xl font-bold">
                        Apple/AAPL
                    </div>
                    <div className="flex flex-col mr-5 ml-5 m-auto">
                        <div className="font-bold flex content-center">
                            <div className="mr-2">Price/Currency: </div>
                            <span className="text-xl">100/USD</span>
                        </div>
                        <div>Dividends: 0.23</div>
                    </div>
                    <div className="flex flex-col mr-5 ml-5 m-auto">
                        <div>ESP: 1.46</div>
                        <div>Revenue: 89.5B</div>
                    </div>
                    <div className="flex flex-col mr-5 ml-5">
                        <div>Sector: Technology</div>
                        <div>Industry: Computers, Phones & Household Electronics</div>
                    </div>

                </div>
            </div>

            <Separator orientation="vertical" className="absolute h-full top-0 -right-4"/>
        </div>
    );
};