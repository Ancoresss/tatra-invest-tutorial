import ProfileContext from "@/context/ProfileContext";
import StockContext from "@/context/StockContext";
import {IStock, ProfileData} from "@/lib/types";
import StockInfo from "@/type/StockInfo";

export const BuyHandler = (
    profileInfo: ProfileContext,
    stockInfo: StockContext,
    inputVal: string
): {} => {
    if (
        !(
            profileInfo.profileData?.balance !== undefined &&
            stockInfo.currentStock?.prices.length &&
            profileInfo.profileData.balance > +inputVal &&
            profileInfo.setProfile
        )
    ) {
        console.log("Not enough balance or invalid profile data");
        return;
    }
    let toBuyValue = Number(inputVal);
    let currentStockPrice = stockInfo.currentStock.prices[0].price;

    const stockBought = toBuyValue / currentStockPrice;
    const priceBefore = profileInfo.profileData.balance;
    const priceSpent = toBuyValue;
    let currentCase = profileInfo.profileData.stocks;
    let existsStatus = currentCase.find((item) => item.id === stockInfo.currentStock?.id);

    if (existsStatus) {
        currentCase = currentCase.map((item) => {
            if (item.id === stockInfo.currentStock?.id) {
                item.amount = item.amount + stockBought;
            }
            return item;
        });
        return{ balance: priceBefore - priceSpent, stocks: currentCase };
    } else {
        return {
            balance: priceBefore - priceSpent,
            stocks: [
                ...currentCase,
                { name: stockInfo.currentStock.id, id: stockInfo.currentStock.id, amount: stockBought },
            ],
        };
    }
};

export const SellHandler = (
    profileData: ProfileData,
    currentStock: IStock,
    inputVal: string,
): ProfileData => {
    if (!(currentStock?.prices.length)) {
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
        profileData,
        balance: profileData?.balance + dollarsAmount,
    };

};