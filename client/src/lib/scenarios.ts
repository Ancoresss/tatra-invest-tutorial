import { IScenario } from "./types";

export const scenarios: IScenario[] = [
  {
    scenarioType: "buyStock",
    instructions: [
      {
        text: "Choose the stock from the list of the available stocks",
      },
      {
        text: "Set the parameters based on which user want to buy the stock",
      },
      {
        text: "Click on the “Buy” button",
      },
    ],
  },
  {
    scenarioType: "buyStockDelay",
    instructions: [
      {
        text: "Choose the stock from the list of the available stocks",
      },
      {
        text: "Set the sum based on which the stock should be bought",
      },
      {
        text: "Click on the “Buy” button",
      },
    ],
  },
  {
    scenarioType: "sellStock",
    instructions: [
      {
        text: "Choose the stock from the list of the bought stocks",
      },
      {
        text: "Set the parameters based on which user want to sell the stock",
      },
      {
        text: "Click on the “Sell” button",
      },
    ],
  },
  {
    scenarioType: "sellStockDelay",
    instructions: [
      {
        text: "Choose the stock from the list of the bought stocks",
      },
      {
        text: "Set the sum based on which the stock should be sold",
      },
      {
        text: "Click on the “Sell” button",
      },
    ],
  },
  {
    scenarioType: "profileCheck",
    instructions: [
      {
        text: "Open list of the bought stocks",
      },
      {
        text: "Select those which should be analysed",
      },
      {
        text: "Checked the calculated report",
      },
    ],
  },
];
