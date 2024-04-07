"use client"

import React, {FC, ReactNode} from "react";
import StockInfo from "@/type/StockInfo";
import {ProfileData} from "@/lib/types";
import StockContext from "@/context/StockContext";

const ProfileContext = React.createContext<{ profileData: ProfileData }>({} as { profileData: ProfileData });

export default ProfileContext;



export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const profileDefaultData: ProfileData ={
        balance:98,
        stocks:[]
    }

    return profileDefaultData ? (
        <ProfileContext.Provider value={{ profileData: profileDefaultData }}>{children}</ProfileContext.Provider>
    ) : null;
};
export function useStockContext() {
    return React.useContext(StockContext);
}