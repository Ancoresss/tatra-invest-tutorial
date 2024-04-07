"use client"

import React, {useContext, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import ProfileContext from "@/context/ProfileContext";
import StockContext from "@/context/StockContext";
import {SimpleStock} from "@/lib/types";

export default function DashboardActions() {

    const profileInfo = useContext(ProfileContext);
    const  stockInfo  = useContext(StockContext);

    const [inputVal,SetInput] = useState("");



    const onBuyHandler = () => {
        if (profileInfo.profileData?.balance !== undefined && stockInfo.currentStock!==undefined && profileInfo.profileData.balance > +inputVal && profileInfo.setProfile ) {
            let toBuyValue: number = +inputVal;
            let currentStockPrice = stockInfo.currentStock?.prices[0]?.price; // Using optional chaining

            if (currentStockPrice !== undefined) {
                console.log("Buy=>", inputVal);

                let log =
                    {nameOfStack:stockInfo.currentStock?.id, priceBefore: profileInfo.profileData.balance,priceSpent: toBuyValue, stockBought:toBuyValue / currentStockPrice }

                let currentCase:Array<SimpleStock> = profileInfo.profileData.stocks


                let eistsStatus = currentCase.find((item)=>item.id==stockInfo.currentStock?.id)

                if (eistsStatus) {
                    currentCase.map((item) => {
                        if (item.id == stockInfo.currentStock?.id) {
                            item.amount = item.amount + log.stockBought
                            return item;
                        }
                    })
                }else{
                    currentCase.push({name:log.nameOfStack,id:log.nameOfStack,amount: log.stockBought})
                }

                profileInfo.setProfile(
                    {balance:log.priceBefore - log.priceSpent,
                    stocks:[]})
                console.log(currentCase);
            }
        } else {
            console.log("Not enough balance or invalid profile data");
        }
    };

    const onSellHandler = ()=> {


        console.log("Sell=>", inputVal)
    }


    return (
        <div className=" p-6 col-span-4 w-full flex gap-4 flex-col">

            <Input type="number" onChange={(event)=>SetInput(event.target.value)} value={inputVal} placeholder="Put your finance"/>
            <div className="flex gap-4">
                <Button onClick={onBuyHandler} className="basis-0 grow">Buy</Button>
                <Button onClick={onSellHandler} className=" borderso basis-0 grow" variant="outline">Sell</Button>
            </div>
        </div>
    );
}