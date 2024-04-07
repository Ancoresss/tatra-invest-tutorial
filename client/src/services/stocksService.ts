import { IStock } from "@/lib/types";
import StockInfo from "@/type/StockInfo";

export const getStocksByCountries = () => {
  return fetch("/api/stocks-by-countries").then((res) => res.json());
};

function findWithNumberValue<T extends Record<string, string | number>>(
  list: T[],
  extractor: (item: T) => string
): string {
  const valueIndex = list.findIndex((item) => !Number.isNaN(parseFloat(extractor(item))));
  return valueIndex !== -1 ? extractor(list[valueIndex]) : "";
}

export const getStockByName = async (name: string): Promise<IStock> => {
  const stockData: StockInfo = await fetch(`/api/stocks?stock=${name}`).then((res) => res.json());
  const eps = findWithNumberValue(stockData.earnings.data, (item) => item.EPS);
  const revenue = findWithNumberValue(stockData.earnings.data, (item) => item.Revenue);
  return {
    id: name,
    prices: stockData.history_data.data.map((item) => ({
      name,
      price: item.Price,
      changePercent: item["Change %"],
      date: item.Date,
    })),
    dividends: String(stockData.dividends.data[0].Dividend),
    eps,
    revenue,
    sector: stockData.profile.data[0].sector,
    industry: stockData.profile.data[0].industry,
  };
};
