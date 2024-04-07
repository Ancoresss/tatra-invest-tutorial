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

function filterDataByDate(stock: StockInfo, date: Date) {
  return {
    dividends: {
      ...stock.dividends,
      data: stock.dividends.data
        .filter((d) => new Date(d["Ex-Dividend Date"]).getTime() < date.getTime())
        .sort(
          (a, b) =>
            new Date(a["Ex-Dividend Date"]).getTime() - new Date(b["Ex-Dividend Date"]).getTime()
        ),
    },
    earnings: {
      ...stock.earnings,
      data: stock.earnings.data
        .filter((d) => new Date(d["Release Date"]).getTime() < date.getTime())
        .sort(
          (a, b) => new Date(a["Release Date"]).getTime() - new Date(b["Release Date"]).getTime()
        ),
    },
    history_data: {
      ...stock.history_data,
      data: stock.history_data.data
        .filter((d) => {
          return new Date(d["Date"]).getTime() < date.getTime();
        })
        .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()),
    },
    profile: stock.profile,
  };
}

export const getStockByName = async (name: string, daysBack: number): Promise<IStock> => {
  const stockDataRaw: StockInfo = await fetch(`/api/stocks?stock=${name}`).then((res) =>
    res.json()
  );
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - daysBack);
  console.log(endDate);
  const stockData = filterDataByDate(stockDataRaw, endDate);
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
