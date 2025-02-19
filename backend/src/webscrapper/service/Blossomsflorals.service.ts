// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import puppeteer from 'puppeteer-core';

// @Injectable()
// export class BlossomFloralsService {
//   private isRunning = false; // Prevents multiple instances of the scraper

//   @Cron(CronExpression.EVERY_10_SECONDS) // Runs every 11 hours in production
//   async scrapeBlossomFloralsProducts() {
//     if (this.isRunning) {
//       console.log('❌ Another scraping process is already running.');
//       return;
//     }

//     this.isRunning = true;

//     let browser;

//     try {
//       console.log('🚀 Launching browser...');
//       browser = await puppeteer.launch({
//         executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//         headless: true, // Use true in production
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       });

//       const page = await browser.newPage();

//       // Set user-agent to avoid bot detection
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

//       console.log('🌐 Navigating to Blossom Florals homepage...');
//       await page.goto('https://www.blossomsflorals.com/', {
//         waitUntil: 'networkidle2',
//         timeout: 0,
//       });

//       console.log('🔍 Extracting product details...');
//       await page.waitForSelector('.row.justify-content-center'); // Wait for product container

//       // Extract product details
//       const productDetails = await page.evaluate(() => {
//         const products = document.querySelectorAll('.row.justify-content-center .col-lg-3.col-md-4.col-sm-6.col-6');

//         const productData = Array.from(products).map((product) => {
//           const name = product.querySelector('.product-title a')?.textContent?.trim() || 'N/A';

//           const productUrl = product.querySelector('.product-title a')?.getAttribute('href') || 'N/A';

//           const primaryImageUrl = product.querySelector('.product-img a img')?.getAttribute('src') || 'N/A';

//           const secondaryImageUrl = product.querySelector('.product-img a.second__img img')?.getAttribute('src') || 'N/A';

//           const price = product.querySelector('.product-price span')?.textContent?.trim() || 'N/A';

//           return {
//             name,
//             productUrl,
//             primaryImageUrl,
//             secondaryImageUrl,
//             price
//           };
//         });

//         return productData;
//       });

//       console.log('🎉 Successfully extracted product details:', productDetails);

//       // Print each product details
//       productDetails.forEach((product, index) => {
//         console.log(`📦 Product #${index + 1}`);
//         console.log(`- Name: ${product.name}`);
//         console.log(`- URL: ${product.productUrl}`);
//         console.log(`- Primary Image: ${product.primaryImageUrl}`);
//         console.log(`- Secondary Image: ${product.secondaryImageUrl}`);
//         console.log(`- Price: ${product.price}`);
//         console.log('----------------------------------');
//       });

//     } catch (error) {
//       console.error('❌ Error occurred while scraping:', error);
//     } finally {
//       if (browser) {
//         console.log('🔒 Closing the browser...');
//         await browser.close();
//       }
//       this.isRunning = false;
//     }
//   }
// }



// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import puppeteer from 'puppeteer-core';
// import { ProductsService } from '../../products/product.service'; // Import the ProductsService

// @Injectable()
// export class BlossomFloralsService {
//   private isRunning = false; // Prevents multiple instances of the scraper

//   constructor(private readonly productsService: ProductsService) {}

//   @Cron(CronExpression.EVERY_10_SECONDS) // Adjust this for production
//   async scrapeBlossomFloralsProducts() {
//     if (this.isRunning) {
//       console.log('❌ Another scraping process is already running.');
//       return;
//     }

//     this.isRunning = true;
//     let browser;

//     try {
//       console.log('🚀 Launching browser...');
//       browser = await puppeteer.launch({
//         executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       });

//       const page = await browser.newPage();
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

//       console.log('🌐 Navigating to Blossom Florals homepage...');
//       await page.goto('https://www.blossomsflorals.com/', {
//         waitUntil: 'networkidle2',
//         timeout: 0,
//       });

//       console.log('🔍 Extracting product details...');
//       await page.waitForSelector('.row.justify-content-center');

//       const productDetails = await page.evaluate(() => {
//         const products = document.querySelectorAll('.row.justify-content-center .col-lg-3.col-md-4.col-sm-6.col-6');

//         return Array.from(products).map((product) => {
//           const name = product.querySelector('.product-title a')?.textContent?.trim() || 'N/A';
//           const productUrl = product.querySelector('.product-title a')?.getAttribute('href') || 'N/A';
//           const primaryImageUrl = product.querySelector('.product-img a img')?.getAttribute('src') || 'N/A';
//           const secondaryImageUrl = product.querySelector('.product-img a.second__img img')?.getAttribute('src') || 'N/A';
//           const priceText = product.querySelector('.product-price span')?.textContent?.trim() || 'N/A';
//           const price = parseFloat(priceText.replace(/[^0-9.-]+/g, '')) || 0;

//           return { name, productUrl, primaryImageUrl, secondaryImageUrl, price };
//         });
//       });

//       console.log('🎉 Successfully extracted product details:', productDetails);

//       // Save each product in the database
//       const deleteproducts = await this.productsService.deleteAll();
//       for (const product of productDetails) {
//         try {
//           const savedProduct = await this.productsService.createOrUpdate({
//             name: product.name,
//             productUrl: product.productUrl,
//             primaryImageUrl: product.primaryImageUrl,
//             secondaryImageUrl: product.secondaryImageUrl,
//             price: product.price,
//             quantity: 1, // Default quantity, update as needed
//             deliverableCities: [], // Add if applicable
//           });
//           console.log(`✅ Product saved: ${savedProduct.name}`);
//         } catch (error) {
//           console.error(`❌ Error saving product ${product.name}:`, error);
//         }
//       }

//     } catch (error) {
//       console.error('❌ Error occurred while scraping:', error);
//     } finally {
//       if (browser) {
//         console.log('🔒 Closing the browser...');
//         await browser.close();
//       }
//       this.isRunning = false;
//     }
//   }
// }
