import asyncio
from playwright.async_api import async_playwright

async def main():
    print("Starting Playwright")

    async with async_playwright() as p:
        print("Playwright started")

        browser = await p.chromium.launch(headless=True)

        print("Browser launched")

        await browser.close()

asyncio.run(main())