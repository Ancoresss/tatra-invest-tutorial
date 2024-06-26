"use client";

import { FC, useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import StockContext from "@/context/StockContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface StocksMenuProps {}

export const StocksMenu: FC<StocksMenuProps> = ({}) => {
  const { currentStock, stocksByCountries, setCurrentStockId } = useContext(StockContext);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button data-buystock-0="right" data-buystockdelay-0="right" data-buystockdate-0="right">Select a stock</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Select a stock from a list.</SheetTitle>
        </SheetHeader>
        <ToggleGroup value={currentStock?.id} type="single" className="flex-col">
          {stocksByCountries?.map((item) => (
            <ToggleGroupItem
              value={item.name}
              key={item.name}
              onClick={() => setCurrentStockId?.(item.name)}
            >
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </SheetContent>
    </Sheet>
  );
};
