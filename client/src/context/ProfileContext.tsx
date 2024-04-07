"use client"

import React, {Dispatch, FC, ReactNode, SetStateAction, useState} from "react";
import StockInfo from "@/type/StockInfo";
import {IStock, ProfileData} from "@/lib/types";
import StockContext from "@/context/StockContext";

const ProfileContext =
    React.createContext<{ profileData?: ProfileData;setProfile?:Dispatch<SetStateAction<ProfileData | undefined>>; }>({} );


export default ProfileContext;



export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [profileData,setProfile]=useState<ProfileData|undefined>({
        balance:98,
        stocks:[]
    })


    // const profileDefaultData: ProfileData ={
    //     balance:98,
    //     stocks:[]
    // }

    return profileData ? (
        <ProfileContext.Provider value={{  profileData, setProfile }}>{children}</ProfileContext.Provider>
    ) : null;
};
export function useStockContext() {
    return React.useContext(StockContext);
}