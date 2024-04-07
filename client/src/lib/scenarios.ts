import { IScenario } from "./types";

export const scenarioNames: Record<string, string> = {
  buystock: "Buy stock",
  buystockdelay: "Buy stock with delay",
  buystockdate: "Buy stock at date",
  sellstock: "Sell stock",
  sellstockdelay: "Sell stock with delay",
};

export const scenarios: IScenario[] = [
  {
    scenarioType: "buystock",
    instructions: [
      {
        text: "Choose the stock from the list of the available stocks",
      },
      {
        text: "Check the “Buy” option",
      },
      {
        text: "Set the sum represents how many stocks user want to buy",
      },
      {
        text: "Click on the “Go” button",
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
        text: "Choose the “Price” option",
      },
      {
        text: "Set the price for the stock based on which it should be bought automatically",
      },
      {
        text: "Set the sum represents how many stocks user want to buy",
      },
      {
        text: "Click on the “Go” button",
      },
    ],
  },
  {
    scenarioType: "buystockdate",
    instructions: [
      {
        text: "Choose the stock from the list of the available stocks",
      },
      {
        text: "Choose the “Time” option",
      },
      {
        text: "Set the date when the stock should be bought automatically",
      },
      {
        text: "Set the sum represents how many stocks user want to buy",
      },
      {
        text: "Click on the “Go” button",
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
        text: "Click on the “Go” button",
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
        text: "Click on the “Go” button",
      },
    ],
  },
];
