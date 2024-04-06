import { FC } from "react";
import { StocksMenu } from "./StocksMenu";
import { Separator } from "./ui/separator";

interface DashboardTopInfoProps {}

export const DashboardTopInfo: FC<DashboardTopInfoProps> = ({}) => {
  return (
    <div className="relative mr-4">
      <StocksMenu />
      <Separator orientation="vertical" className="absolute h-full top-0 -right-4" />
    </div>
  );
};
