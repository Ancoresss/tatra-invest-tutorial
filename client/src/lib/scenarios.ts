import { IScenario } from "./types";

export const scenarios: IScenario[] = [
  {
    scenarioType: "buystock",
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
    scenarioType: "buystockdelay",
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
    scenarioType: "sellstock",
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
    scenarioType: "sellstockdelay",
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
];
