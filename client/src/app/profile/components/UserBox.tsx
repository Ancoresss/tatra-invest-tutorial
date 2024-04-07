import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {SquareUserRound} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function UserBox() {

    return (
        <div className=" flex flex-col justify-center">

            <Card className="p-12">
                <CardTitle>Name Surname</CardTitle>
            </Card>

            {/*<*/}

            <Card className="p-4 ">

                <div className="w-full  p-2 rounded items-center border flex ali justify-between">
                    <div>Apple</div>
                    <div>23.2</div>
                    <Button>Watch</Button>
                </div>
                <div className="w-full  p-2 rounded items-center border flex ali justify-between">
                    <div>Apple</div>
                    <div>23.2</div>
                    <Button>Watch</Button>
                </div>

            </Card>


        </div>
    );


}