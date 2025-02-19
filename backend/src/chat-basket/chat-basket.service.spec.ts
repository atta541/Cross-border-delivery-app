import { Test, TestingModule } from '@nestjs/testing';
import { ChatBasketService } from './chat-basket.service';

describe('ChatBasketService', () => {
  let service: ChatBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatBasketService],
    }).compile();

    service = module.get<ChatBasketService>(ChatBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
