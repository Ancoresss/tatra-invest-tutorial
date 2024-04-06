import StockInfo from "@/type/StockInfo";

export const getStocksByCountries = () => {
  return fetch("/api/stocks-by-countries").then((res) => res.json());
};

export const getStockByName = async (name: string): Promise<StockInfo> => {
  return fetch(`/api/stocks?stock=${name}`).then((res) => res.json());
};
