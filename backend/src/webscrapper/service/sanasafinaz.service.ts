import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';

@Injectable()
export class sanasafinazService {
  private isRunning = false; // Prevents multiple instances of the scraper

  @Cron(CronExpression.EVERY_10_SECONDS) // Runs every 10 seconds for testing
  async scrapeSanaSafinazProducts() {
    if (this.isRunning) {
      console.log('❌ Another scraping process is already running.');
      return;
    }

    this.isRunning = true;

    let browser;

    try {
      console.log('🚀 Launching browser...');
      browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true, // Use true in production
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Set user-agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

      console.log('🌐 Navigating to Sana Safinaz ready-to-wear page...');
      await page.goto('https://www.sanasafinaz.com/pk/ready-to-wear.html', {
        waitUntil: 'networkidle2',
        timeout: 0,
      });

      console.log('🔍 Extracting product details...');
      await page.waitForSelector('.products.wrapper.grid.products-grid'); // Wait for product container

      // Extract product details
      const productDetails = await page.evaluate(() => {
        const products = document.querySelectorAll('.item.product.product-item');

        const productData = Array.from(products).map((product) => {
          const name = product.querySelector('.product-item-link')?.textContent?.trim() || 'N/A';

          const productUrl = product.querySelector('.product-item-link')?.getAttribute('href') || 'N/A';

          const imageUrl = product.querySelector('.product-image-photo')?.getAttribute('src') || 'N/A';

          const price = product.querySelector('.price-wrapper .price')?.textContent?.trim() || 'N/A';

          return {
            name,
            productUrl,
            imageUrl,
            price
          };
        });

        return productData;
      });

      console.log('🎉 Successfully extracted product details:', productDetails);

      // Print each product details
      productDetails.forEach((product, index) => {
        console.log(`📦 Product #${index + 1}`);
        console.log(`- Name: ${product.name}`);
        console.log(`- URL: ${product.productUrl}`);
        console.log(`- Image: ${product.imageUrl}`);
        console.log(`- Price: ${product.price}`);
        console.log('----------------------------------');
      });

    } catch (error) {
      console.error('❌ Error occurred while scraping:', error);
    } finally {
      if (browser) {
        console.log('🔒 Closing the browser...');
        await browser.close();
      }
      this.isRunning = false;
    }
  }
}
