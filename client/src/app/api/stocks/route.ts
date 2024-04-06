import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export const GET = async (req: NextRequest) => {
  const stockName = req.nextUrl.searchParams.get("stock");
  const basePath = `${process.cwd()}/src/data/stock_${stockName}`;
  console.log(`${basePath}/stock_${stockName}_dividends.json`);
  const [dividends, earnings, history_data, overview, profile, technical_analysis] = [
    fs.readFileSync(`${basePath}/stock_${stockName}_dividends.json`),
    fs.readFileSync(`${basePath}/stock_${stockName}_earnings.json`),
    fs.readFileSync(`${basePath}/stock_${stockName}_histor_data.json`),
    fs.readFileSync(`${basePath}/stock_${stockName}_overview.json`),
    fs.readFileSync(`${basePath}/stock_${stockName}_profile.json`),
    fs.readFileSync(`${basePath}/stock_${stockName}_technical-analysis.json`),
  ].map((e) => JSON.parse(e.toString()));

  return NextResponse.json({
    dividends,
    earnings,
    history_data,
    overview,
    profile,
    technical_analysis,
  });
};
