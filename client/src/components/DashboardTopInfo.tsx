import { FC, useContext } from "react";
import { StocksMenu } from "./StocksMenu";
import { Separator } from "./ui/separator";
import StockContext from "@/context/StockContext";

interface DashboardTopInfoProps {}

export const DashboardTopInfo: FC<DashboardTopInfoProps> = ({}) => {
  const info = useContext(StockContext);

  console.log(info);

  return (
    <div className="relative mr-4">
      <StocksMenu />
      <Separator orientation="vertical" className="absolute h-full top-0 -right-4" />
    </div>
  );
};
