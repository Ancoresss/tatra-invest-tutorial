import {Header} from "@/components/Header";
import {StockProvider} from "@/context/StockContext";
import {ReactNode} from "react";
import {ProfileProvider} from "@/context/ProfileContext";

export default function Template({children}: { children: ReactNode }) {
    return (
        <StockProvider>
            <ProfileProvider>
                <Header></Header>
                {children}
            </ProfileProvider>
        </StockProvider>
    );
}
