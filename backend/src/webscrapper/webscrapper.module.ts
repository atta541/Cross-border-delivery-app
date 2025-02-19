// import { Module } from '@nestjs/common';
// import { WebscrapperController } from './webscrapper.controller';
// import { WebscrapperService } from './webscrapper.service';

// @Module({
//   controllers: [WebscrapperController],
//   providers: [WebscrapperService],
// })
// export class WebscrapperModule {}



import { Module } from '@nestjs/common';
import { WebscrapperController } from './webscrapper.controller';
import { WebscrapperService } from './webscrapper.service';

import { sanasafinazService } from './service/sanasafinaz.service';
import { AlmirahService } from './service/Almirah.service';
import { BundukhansweetsService } from './service/bundukhansweets.service';
import { LayersService } from './service/layers.service';
// import { BlossomFloralsService } from './service/Blossomsflorals.service';
import { ProductsService } from '@src/products/product.service';
import { ProductsModule } from '.././products/product.module';

@Module({
  imports: [ProductsModule], // Import ProductModule to make ProductsService available

  controllers: [WebscrapperController],
  providers: [
    // WebscrapperService,
    // sanasafinazService,
    // AlmirahService,
    // BundukhansweetsService,
    // LayersService,
    // BlossomFloralsService,
  ],
  // imports: [ProductsService],
})
export class WebscrapperModule {}
