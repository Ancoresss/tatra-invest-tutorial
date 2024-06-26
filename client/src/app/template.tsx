import {Header} from "@/components/Header";
import {GuideProvider} from "@/context/GuideContext";
import {ProfileProvider} from "@/context/ProfileContext";
import {StockProvider} from "@/context/StockContext";
import {ReactNode} from "react";

export default function Template({children}: { children: ReactNode }) {
    return (
        <ProfileProvider>

            <StockProvider>
                <GuideProvider>
                    <Header></Header>
                    {children}
                </GuideProvider>
            </StockProvider>
        </ProfileProvider>

    );
}
