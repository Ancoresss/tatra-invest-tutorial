interface StockInfo {
  dividends: {
    data: Array<{ Dividend: number }>;
  };
  earnings: {
    data: Array<{
      EPS: string;
      Revenue: string;
    }>;
  };
  history_data: {
    data: Array<{
      "Change %": string;
      Date: string;
      Price: number;
    }>;
  };
  overview: {};
  profile: {
    data: Array<{ sector: string; industry: string }>;
  };
  technical_analysis: {};
}

export default StockInfo;
