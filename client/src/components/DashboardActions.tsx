
import React from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function DashboardActions() {
    return (
        <div className=" p-6 col-span-4 w-full flex gap-4 flex-col">

            <Input type="number" placeholder="Put your finance"/>
            <div className="flex gap-4">
                <Button className="basis-0 grow">Buy</Button>
                <Button className=" borderso basis-0 grow" variant="outline">Sell</Button>
            </div>
        </div>
    );
}