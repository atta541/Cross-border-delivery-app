


// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import puppeteer from 'puppeteer-core';

// @Injectable()
// export class WebscrapperService {
//   private isRunning = false; // Track if the scraper is already running

//   @Cron(CronExpression.EVERY_10_SECONDS) // Runs every 10 seconds (for testing purposes)
//   async scrapeCakes() {
//     if (this.isRunning) {
//       console.log('❌ Another scraping process is already running.');
//       return; // Prevent running the scraper if it is already running
//     }

//     this.isRunning = true; // Set the flag to true to indicate the process is running

//     let browser;

//     try {
//       console.log('🚀 Launching browser...');
//       browser = await puppeteer.launch({
//         executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Path to Chrome
//         headless: false, // Run browser in non-headless mode for debugging (set to true in production)
//         args: ['--no-sandbox', '--disable-setuid-sandbox'], // Avoid permission issues
//       });

//       const page = await browser.newPage();
      
//       // Set user-agent to avoid bot detection
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

//       console.log('🌐 Navigating to Layers Cakes website...');
//       await page.goto('https://layers.pk/product-category/cakes/', { waitUntil: 'networkidle2', timeout: 0 });

//       // Wait for the product elements to be present on the page
//       await page.waitForSelector('.xts-product'); // Wait until at least one product is visible

//       console.log('🔍 Extracting product details...');
      
//       // Extract product details using page.evaluate
//       const productDetails = await page.evaluate(() => {
//         // Select all products on the page
//         const products = document.querySelectorAll('.xts-product');
        
//         // Loop through each product and extract the data
//         const productData = Array.from(products).map(product => {
//           const name = product.querySelector('.woocommerce-loop-product__title a')?.textContent?.trim() || 'N/A';
//           const productUrl = product.querySelector('.woocommerce-loop-product__title a')?.getAttribute('href') || 'N/A';
//           const imageUrl = product.querySelector('.xts-product-image img')?.getAttribute('src') || 'N/A';
//           const description = product.querySelector('.xts-product-desc p')?.textContent?.trim() || 'N/A';
//           const price = product.querySelector('.price .woocommerce-Price-amount bdi')?.textContent?.trim() || 'N/A';
//           const weight = product.querySelector('.xts-product-attributes.xts-product-meta')?.textContent?.trim() || 'N/A';

//           return {
//             name,
//             productUrl,
//             imageUrl,
//             description,
//             price,
//             weight
//           };
//         });

//         return productData; // Return the array of product data
//       });

//       console.log('🎉 Successfully extracted product details:', productDetails);

//       // Simulate saving to a database (replace this with a database call)
//       productDetails.forEach((product, index) => {
//         console.log(`📦 Product #${index + 1}`);
//         console.log(`- Name: ${product.name}`);
//         console.log(`- URL: ${product.productUrl}`);
//         console.log(`- Image: ${product.imageUrl}`);
//         console.log(`- Description: ${product.description}`);
//         console.log(`- Price: ${product.price}`);
//         console.log(`- Weight: ${product.weight}`);
//         console.log('----------------------------------');
//       });

//     } catch (error) {
//       console.error('❌ Error occurred while scraping:', error);
//     } finally {
//       if (browser) {
//         console.log('🔒 Closing the browser...');
//         await browser.close();
//       }
//       this.isRunning = false; // Reset the flag
//     }
//   }
// }












// //////////////////////////




import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';

@Injectable()
export class LayersService {
  private isRunning = false; // Track if the scraper is already running

  private readonly categories = [
    'cakes',
    'brownies',
    'desserts',
    'cupcakes',
    'sundae',
    'cookies',
  ];

  @Cron(CronExpression.EVERY_10_SECONDS) // Runs every 10 seconds (for testing purposes)
  async scrapeAllCategories() {
    if (this.isRunning) {
      console.log('❌ Another scraping process is already running.');
      return; // Prevent running the scraper if it is already running
    }

    this.isRunning = true; // Set the flag to true to indicate the process is running

    let browser;

    try {
      console.log('🚀 Launching browser...');
      browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Path to Chrome
        headless: false, // Run browser in non-headless mode for debugging (set to true in production)
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Avoid permission issues
      });

      const page = await browser.newPage();
      
      // Set user-agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

      // Loop through each category and scrape the corresponding page
      for (const category of this.categories) {
        const url = `https://layers.pk/product-category/${category}/`;
        console.log(`🌐 Navigating to ${category} page: ${url}`);
        await this.scrapeCategoryPage(page, url);
      }

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

  // Function to scrape product details from a single category page
  private async scrapeCategoryPage(page, url: string) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

      // Wait for the product elements to be present on the page
      await page.waitForSelector('.xts-product'); // Wait until at least one product is visible

      console.log('🔍 Extracting product details...');

      // Extract product details using page.evaluate
      const productDetails = await page.evaluate(() => {
        // Select all products on the page
        const products = document.querySelectorAll('.xts-product');
        
        // Loop through each product and extract the data
        const productData = Array.from(products).map(product => {
          const name = product.querySelector('.woocommerce-loop-product__title a')?.textContent?.trim() || 'N/A';
          const productUrl = product.querySelector('.woocommerce-loop-product__title a')?.getAttribute('href') || 'N/A';
          const imageUrl = product.querySelector('.xts-product-image img')?.getAttribute('src') || 'N/A';
          const description = product.querySelector('.xts-product-desc p')?.textContent?.trim() || 'N/A';
          const price = product.querySelector('.price .woocommerce-Price-amount bdi')?.textContent?.trim() || 'N/A';
          const weight = product.querySelector('.xts-product-attributes.xts-product-meta')?.textContent?.trim() || 'N/A';

          return {
            name,
            productUrl,
            imageUrl,
            description,
            price,
            weight
          };
        });

        return productData; // Return the array of product data
      });

      console.log(`🎉 Successfully extracted product details from ${url}:`, productDetails);

      // Simulate saving to a database (replace this with a database call)
      productDetails.forEach((product, index) => {
        console.log(`📦 Product #${index + 1}`);
        console.log(`- Name: ${product.name}`);
        console.log(`- URL: ${product.productUrl}`);
        console.log(`- Image: ${product.imageUrl}`);
        console.log(`- Description: ${product.description}`);
        console.log(`- Price: ${product.price}`);
        console.log(`- Weight: ${product.weight}`);
        console.log('----------------------------------');
      });

    } catch (error) {
      console.error(`❌ Error occurred while scraping category ${url}:`, error);
    }
  }
}
