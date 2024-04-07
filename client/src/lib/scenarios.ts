import { IScenario } from "./types";

export const scenarios: IScenario[] = [
    {
        scenarioType: 'buyStock',
        instructions: [
            {
                text: 'Choose the stock from the list of the available stocks',
                targetElementId: ''
            },
            {
                text: 'Set the parameters based on which user want to buy the stock',
                targetElementId: ''
            },
            {
                text: 'Click on the “Buy” button',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'buyStockDelay',
        instructions: [
            {
                text: 'Choose the stock from the list of the available stocks',
                targetElementId: ''
            },
            {
                text: 'Set the sum based on which the stock should be bought',
                targetElementId: ''
            },
            {
                text: 'Click on the “Buy” button',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'sellStock',
        instructions: [
            {
                text: 'Choose the stock from the list of the bought stocks',
                targetElementId: ''
            },
            {
                text: 'Set the parameters based on which user want to sell the stock',
                targetElementId: ''
            },
            {
                text: 'Click on the “Sell” button',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'sellStockDelay',
        instructions: [
            {
                text: 'Choose the stock from the list of the bought stocks',
                targetElementId: ''
            },
            {
                text: 'Set the sum based on which the stock should be sold',
                targetElementId: ''
            },
            {
                text: 'Click on the “Sell” button',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'profileCheck',
        instructions: [
            {
                text: 'Open list of the bought stocks',
                targetElementId: ''
            },
            {
                text: 'Select those which should be analysed',
                targetElementId: ''
            },
            {
                text: 'Checked the calculated report',
                targetElementId: ''
            }
        ]
    }
]