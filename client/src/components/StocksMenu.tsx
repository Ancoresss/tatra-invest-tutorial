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

interface StocksMenuProps {}

export const StocksMenu: FC<StocksMenuProps> = ({}) => {
  const { currentStock } = useContext(StockContext);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Select a stock</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Select a stock from a list.</SheetTitle>
        </SheetHeader>
        <div>Select stocks by </div>
      </SheetContent>
    </Sheet>
  );
};
