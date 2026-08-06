from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
from playwright.async_api import async_playwright
import google.generativeai as genai
import json

app = FastAPI(title="Alpha Analyzer Backend Worker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = "AQ.Ab8RN6Lh23b3vZW5PCfkYW-OsKRZ398GCgPELeTDfm7EiAaOCg"
genai.configure(api_key=GEMINI_API_KEY)

class URLRequest(BaseModel):
    url: str

@app.post("/api/fetch-signal")
async def fetch_signal_from_url(req: URLRequest):
    target_url = req.url
    print(f"[*] AI Scraper Worker menerima URL: {target_url}")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        try:
            await page.goto(target_url, timeout=60000)
            await page.wait_for_load_state("networkidle")
            screenshot_bytes = await page.screenshot(full_page=True)

            model = genai.GenerativeModel("gemini-1.5-flash")
            master_prompt = """
            Anda adalah AI Chief Data Extractor institusional untuk platform ALPHA ANALYZER.
            Analisis screenshot halaman MQL5 ini secara teliti dan ekstrak data metrik ke dalam format JSON murni TANPA markdown block (```json):
            {
              "signalName": "Nama sinyal",
              "provider": "Nama provider",
              "broker": "Nama broker",
              "leverage": "Rasio leverage",
              "reliabilityWeeks": 50,
              "reliabilityBarsCount": 5,
              "subscribersCount": 1,
              "subscribersCapitalUSD": 500,
              "growth": "1,500.00%",
              "netProfit": 500.00,
              "winRate": 65.00,
              "profitFactor": 2.10,
              "maxDD": 18.5,
              "balance": 1000.00,
              "equity": 980.00,
              "initialDeposit": 500.00,
              "totalDeposit": 500.00,
              "totalWithdrawal": 100.00,
              "payoffRatio": 1.45,
              "maxDepositLoad": 2.1,
              "algoTrading": 85,
              "profitTradesShare": 65.0,
              "lossTradesShare": 35.0,
              "tradingActivity": 20.0,
              "avgHoldingDays": 3.5,
              "totalSwap": -12.50,
              "tradingDays": "60 Hari Aktif",
              "alphaAsset": { "name": "XAUUSD", "profit": 350.00, "winRate": 80.0, "trades": 30 },
              "additionalNotes": ["Berhasil dipindai dari MQL5 via Python Worker."]
            }
            """

            image_part = {"mime_type": "image/png", "data": screenshot_bytes}
            response = model.generate_content([master_prompt, image_part])
            raw_text = response.text.replace("```json", "").replace("```", "").strip()
            
            extracted_data = json.loads(raw_text)
            await browser.close()
            return {"status": "success", "data": extracted_data}

        except Exception as e:
            await browser.close()
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=9999)
