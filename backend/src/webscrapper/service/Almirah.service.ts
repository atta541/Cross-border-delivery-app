import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AlmirahService {
  private isRunning = false; // To prevent concurrent scraping

  @Cron(CronExpression.EVERY_10_SECONDS) // Runs every 10 seconds (for testing purposes)
  async scrapeAlmirahProducts() {
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

      console.log('🌐 Navigating to Almirah products page...');
      await page.goto('https://almirah.com.pk/collections/formal-stitched', { waitUntil: 'networkidle2', timeout: 0 });

      console.log('🔍 Waiting for product elements to load...');
      await page.waitForSelector('.grid__item'); // Wait for product elements to be visible

      console.log('🔍 Extracting product details...');
      const productDetails = await page.evaluate(() => {
        const products = document.querySelectorAll('.grid__item');

        const productData = Array.from(products).map(product => {
          const name = product.querySelector('.grid-product__title')?.textContent?.trim() || 'N/A';
          const productUrl = product.querySelector('.grid-product__link')?.getAttribute('href') || 'N/A';
          const imageUrl = product.querySelector('.grid-product__image')?.getAttribute('data-srcset')?.split(',')[0].split(' ')[0] || 'N/A'; // First image URL
          const price = product.querySelector('.grid-product__price .money')?.textContent?.trim() || 'N/A';

          return {
            name,
            productUrl,
            imageUrl,
            price,
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
