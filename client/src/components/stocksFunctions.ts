import ProfileContext from "@/context/ProfileContext";
import StockContext from "@/context/StockContext";
import {IStock, ProfileData, SimpleStock} from "@/lib/types";
import StockInfo from "@/type/StockInfo";

export const BuyHandler = (
    profileData: ProfileData,
    currentStock: IStock,
    inputVal: string
): ProfileData|undefined => {


    if (
        !(
            profileData?.balance !== undefined &&
            currentStock?.prices.length &&
            profileData.balance > +inputVal
        )
    ) {
        console.log("Not enough balance or invalid profile data");
        return;
    }
    let toBuyValue = Number(inputVal);
    let currentStockPrice = currentStock.prices[0].price;

    const stockBought = toBuyValue / currentStockPrice;
    const priceBefore = profileData.balance;
    const priceSpent = toBuyValue;
    let currentCase: Array<SimpleStock> = profileData.stocks;
    let existsStatus = currentCase.find((item) => item.id == currentStock?.id);

    if (existsStatus) {
        currentCase.map((item) => {
            if (item.id == currentStock?.id) {
                item.amount = item.amount + stockBought;
                return item;
            }
        });
        return { balance: priceBefore - priceSpent, stocks: currentCase };
    } else {
        return{
            balance: priceBefore - priceSpent,
            stocks: [
                ...currentCase,
                { name: currentStock.id, id: currentStock.id, amount: stockBought },
            ],
        };
    }


};

export const SellHandler = (
    profileData: ProfileData,
    currentStock: IStock,
    inputVal: string,
): ProfileData|undefined => {

    if (!(currentStock?.prices.length )) {
        console.log("Not enough balance or invalid profile data");
        return;
    }
    let toSellValue = Number(inputVal);
    let currentStockPrice = currentStock.prices[0].price;

    const dollarsAmount = toSellValue * currentStockPrice;
    const userStock = profileData?.stocks.find(
        (s) => s.id === currentStock?.id
    );
    const userAmount = userStock?.amount ?? 0;
    if (!userStock || userAmount < toSellValue) {
        return;
    }

    userStock.amount -= toSellValue;

    return {
        ...profileData,
        balance: profileData?.balance + dollarsAmount,
    };


};