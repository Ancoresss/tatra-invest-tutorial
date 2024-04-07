"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {FC, useContext} from "react";
import ProfileContext from "@/context/ProfileContext";
import Link from "next/link";
import {LucideLineChart} from "lucide-react";
import {black} from "next/dist/lib/picocolors";


interface HeaderProps {
}

export const Header: FC<HeaderProps> = () => {
    const info = useContext(ProfileContext);


    return (
        <header className="gap-3 text-lg flex w-full justify-between pt-3 pb-0 p-6">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className="flex gap-2">

                        <NavigationMenuLink asChild><Link href="/">Home</Link></NavigationMenuLink>
                        <NavigationMenuLink asChild><Link href="/profile">Profile</Link></NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex gap-2">
                <LucideLineChart color="black" /> Tatra Invest
            </div>

            <div className="flex gap-2">
                <div>Balance:</div>
                <div className="font-bold">{info.profileData.balance}$</div>
            </div>
        </header>
    );
};
