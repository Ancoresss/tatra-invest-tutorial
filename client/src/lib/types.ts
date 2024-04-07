export type ChartData = {
  name: string;
  price: number;
  changePercent: string;
  date: string;
};

export type SimpleStock ={
  name:string,
  id:string,
  amount:number,
}
export type ProfileData = {
  balance: number;
  stocks: Array<SimpleStock>;
};

export type StockByCountry = { name: string; country: string };

export type IStock = {
  id: string;
  prices: Array<ChartData>;
  dividends: string;
  eps: string;
  revenue: string;
  sector: string;
  industry: string;
};

export type IScenarioInstruction = {
  text: string;
  targetElementId: string;
};

export type IScenario = {
  scenarioType: string;
  instructions: IScenarioInstruction[];
};
