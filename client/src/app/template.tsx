import { Header } from "@/components/Header";
import { StockProvider } from "@/context/StockContext";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <StockProvider>
      <Header></Header>
      {children}
    </StockProvider>
  );
}
