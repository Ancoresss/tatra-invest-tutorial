"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileContext from "@/context/ProfileContext";
import StockContext from "@/context/StockContext";
import { SimpleStock } from "@/lib/types";

import React, { useContext, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {Calendar} from "@/components/ui/calendar";


export default function DashboardActions() {
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [transactionCharacter, setTransactionCharacter] = useState<"immediately" | "time"| "price">("immediately")

  const profileInfo = useContext(ProfileContext);
  const stockInfo = useContext(StockContext);

  const [inputVal, setInput] = useState("");

  const [pricePicker, setPricePicker] = useState(0);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const currentStockProfile = profileInfo.profileData?.stocks.find(
    (s) => s.id === stockInfo.currentStock?.id
  );

  const onBuyHandler = () => {
    if (
      !(
        profileInfo.profileData?.balance !== undefined &&
        stockInfo.currentStock?.prices.length &&
        profileInfo.profileData.balance > +inputVal &&
        profileInfo.setProfile
      )
    ) {
      console.log("Not enough balance or invalid profile data");
      return;
    }
    let toBuyValue = Number(inputVal);
    let currentStockPrice = stockInfo.currentStock.prices[0].price;

    const stockBought = toBuyValue / currentStockPrice;
    const priceBefore = profileInfo.profileData.balance;
    const priceSpent = toBuyValue;
    let currentCase: Array<SimpleStock> = profileInfo.profileData.stocks;
    let existsStatus = currentCase.find((item) => item.id == stockInfo.currentStock?.id);

    if (existsStatus) {
      currentCase.map((item) => {
        if (item.id == stockInfo.currentStock?.id) {
          item.amount = item.amount + stockBought;
          return item;
        }
      });
      profileInfo.setProfile({ balance: priceBefore - priceSpent, stocks: currentCase });
    } else {
      profileInfo.setProfile({
        balance: priceBefore - priceSpent,
        stocks: [
          ...currentCase,
          { name: stockInfo.currentStock.id, id: stockInfo.currentStock.id, amount: stockBought },
        ],
      });
    }
    setInput("");
  };

  const onSellHandler = () => {
    if (!(stockInfo.currentStock?.prices.length && profileInfo.setProfile)) {
      console.log("Not enough balance or invalid profile data");
      return;
    }
    let toSellValue = Number(inputVal);
    let currentStockPrice = stockInfo.currentStock.prices[0].price;

    const dollarsAmount = toSellValue * currentStockPrice;
    const userStock = profileInfo.profileData?.stocks.find(
      (s) => s.id === stockInfo.currentStock?.id
    );
    const userAmount = userStock?.amount ?? 0;
    if (!userStock || userAmount < toSellValue) {
      return;
    }

    userStock.amount -= toSellValue;

    profileInfo.setProfile({
      ...profileInfo.profileData,
      balance: profileInfo.profileData?.balance + dollarsAmount,
    });

    setInput("");
  };

  return (
    <div className=" p-6 col-span-4 w-full flex gap-4 flex-col">
      <ToggleGroup type="single" value={transactionType}>
        <ToggleGroupItem value="buy" onClick={() => setTransactionType("buy")}>
          Buy
        </ToggleGroupItem>
        <ToggleGroupItem value="sell" onClick={() => setTransactionType("sell")}>
          Sell
        </ToggleGroupItem>
      </ToggleGroup>
      <div>
        <span className="font-bold">Stock amount: </span>
        <span>
          {currentStockProfile?.amount
            ? Math.round(currentStockProfile?.amount * 10 ** 6) / 10 ** 6
            : 0}
        </span>
      </div>
      <div data-buystock-1="top">
        <Input
          type="number"
          onKeyDown={(e) =>
            e.key === "Enter" && (transactionType === "buy" ? onBuyHandler() : onSellHandler())
          }
          onChange={(event) => setInput(event.target.value)}
          value={inputVal}
          placeholder={transactionType === "buy" ? "Amount in $" : "Amount in stock"}
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={transactionType === "buy" ? onBuyHandler : onSellHandler}
          className="basis-0 grow"
        >
          Go
        </Button>
      </div>

      <ToggleGroup type="single" value={transactionCharacter}>
        <ToggleGroupItem value="immediately" onClick={() => setTransactionCharacter("immediately")}>
          Immidiately
        </ToggleGroupItem>
        <ToggleGroupItem value="time" onClick={() => setTransactionCharacter("time")}>
          Time
        </ToggleGroupItem>
        <ToggleGroupItem value="price" onClick={() => setTransactionCharacter("price")}>
          Price
        </ToggleGroupItem>
      </ToggleGroup>

      {transactionCharacter=="time" && <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border self-center"
      />}
      {transactionCharacter=="price" &&
          <Input
              type="number"

              onChange={(event) => setPricePicker(+event.target.value)}
              value={pricePicker}
              placeholder={"Put limit price"}
          />
          // <Slider defaultValue={[0]} value={[pricePicker]} onChange={(event)=> console.log(event.target.value)} max={100} step={1} />
      }

    </div>
  );
}
