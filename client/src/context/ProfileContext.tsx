"use client"

import { ProfileData } from "@/lib/types";
import React, { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

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
