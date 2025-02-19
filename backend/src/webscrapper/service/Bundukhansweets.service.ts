
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';

@Injectable()
export class BundukhansweetsService {
  private isRunning = false; // To prevent concurrent scraping

  @Cron(CronExpression.EVERY_11_HOURS) // Runs every 10 seconds (for testing purposes)
  async scrapeSweets() {
    if (this.isRunning) {
      console.log('❌ Another scraping process is already running.');
      return; // Prevent multiple instances from running at the same time
    }

    this.isRunning = true; // Mark as running
    let browser;

    try {
      console.log('🚀 Launching browser...');
      browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Path to Chrome
        headless: false, // Set to true in production
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      );

      console.log('🌐 Navigating to Bundukhan Sweets website...');
      await page.goto('https://www.bundukhansweets.pk/sweets/', { waitUntil: 'networkidle2', timeout: 0 });

      console.log('🔍 Waiting for product elements to load...');
      await page.waitForSelector('ul.products li.product'); // Wait for product elements to be visible

      console.log('🔍 Extracting product details...');
      const productDetails = await page.evaluate(() => {
        const products = document.querySelectorAll('ul.products li.product');

        const productData = Array.from(products).map(product => {
          const name = product.querySelector('h3.product-title a')?.textContent?.trim() || 'N/A';
          const productUrl = product.querySelector('h3.product-title a')?.getAttribute('href') || 'N/A';
          const imageUrl = product.querySelector('.featured-image img')?.getAttribute('src') || 'N/A';
          const price = product.querySelector('.woocommerce-Price-amount bdi')?.textContent?.trim() || 'N/A';
          const description = product.querySelector('.fusion-product-content .product-details-container')?.textContent?.trim() || 'N/A';

          return {
            name,
            productUrl,
            imageUrl,
            price,
            description
          };
        });

        return productData; // Return array of product data
      });

      console.log('🎉 Successfully extracted product details:', productDetails);

      // Simulate saving to a database (replace this with a database call)
      productDetails.forEach((product, index) => {
        console.log(`📦 Product #${index + 1}`);
        console.log(`- Name: ${product.name}`);
        console.log(`- URL: ${product.productUrl}`);
        console.log(`- Image: ${product.imageUrl}`);
        console.log(`- Price: ${product.price}`);
        console.log(`- Description: ${product.description}`);
        console.log('----------------------------------');
      });

    } catch (error) {
      console.error('❌ Error occurred while scraping:', error);
    } finally {
      if (browser) {
        console.log('🔒 Closing the browser...');
        await browser.close();
      }
      this.isRunning = false; // Reset the flag
    }
  }
}
