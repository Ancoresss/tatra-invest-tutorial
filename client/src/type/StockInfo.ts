interface StockInfo {
  dividends: {
    data: Array<{ Dividend: number; "Ex-Dividend Date": string }>;
  };
  earnings: {
    data: Array<{
      EPS: string;
      Revenue: string;
      "Release Date": string;
    }>;
  };
  history_data: {
    data: Array<{
      "Change %": string;
      Date: string;
      Price: number;
    }>;
  };
  profile: {
    data: Array<{ sector: string; industry: string }>;
  };
}

export default StockInfo;
