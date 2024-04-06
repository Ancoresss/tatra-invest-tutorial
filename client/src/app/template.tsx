import {Header} from "@/components/Header";
import StockContext from "@/context/StockContext";

export default function Template({children}) {


    return (
        <>
            <Header></Header>
            {children}

        </>
    );
}
