import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json([
    { name: "AMD", country: "united states" },
    { name: "AMZN", country: "united states" },
    { name: "AAPL", country: "united states" },
    { name: "INTC", country: "united states" },
    { name: "TSLA", country: "united states" },
  ]);
};
