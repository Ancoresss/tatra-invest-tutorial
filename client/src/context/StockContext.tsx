import React from 'react';
import useSWR from 'swr'
import StockService from "@/services/invest-api/StockService";


const StockContext = React.createContext<{stocks:any}>({stocks:{}});

export default StockContext;

// export const StockProider = ()=>{
//     const {data} = useSWR("/stock", ()=> {
//         // return StockService.
//     })
//
//
//     return <StockContext.Provider value={data}></StockContext.Provider>
// }
export function useStockContext() {
    return React.useContext(StockContext);
}