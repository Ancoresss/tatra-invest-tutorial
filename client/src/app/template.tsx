import {Header} from "@/components/Header";
import {StockProvider} from '@/context/StockContext'
export default function Template({children}) {


    return (
        <StockProvider>

            <Header></Header>
            {children}

        </StockProvider>
    );
}
