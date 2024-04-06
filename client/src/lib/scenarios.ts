import { IScenario } from "./types";

export const scenarios: IScenario[] = [
    {
        scenarioType: 'buyStock',
        instructions: [
            {
                text: 'Choose the stock from the list of the available stocks',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'buyStock',
        instructions: [
            {
                text: 'Set the parameters based on which user want to buy the stock',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'buyStock',
        instructions: [
            {
                text: 'Set the date and conditions based on which the stock should be bought (optional)',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'buyStock',
        instructions: [
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
            }
        ]
    },
    {
        scenarioType: 'sellStock',
        instructions: [
            {
                text: 'Set the parameters based on which user want to sell the stock',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'sellStock',
        instructions: [
            {
                text: 'Set the date and conditions based on which the stock should be sold (optional)',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'sellStock',
        instructions: [
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
            }
        ]
    },
    {
        scenarioType: 'profileCheck',
        instructions: [
            {
                text: 'Select those which should be analysed',
                targetElementId: ''
            }
        ]
    },
    {
        scenarioType: 'profileCheck',
        instructions: [
            {
                text: 'Checked the calculated report',
                targetElementId: ''
            }
        ]
    }
]