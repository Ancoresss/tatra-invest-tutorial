import {useContext} from "react"
import ProfileContext from "@/context/ProfileContext";
import StockContext from "@/context/StockContext";

export const useStockActions = () => {
  const profileInfo = useContext(ProfileContext);
  const stockInfo = useContext(StockContext);

  return {}
}