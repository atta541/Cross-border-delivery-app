import { Test, TestingModule } from '@nestjs/testing';
import { ChatBasketController } from './chat-basket.controller';

describe('ChatBasketController', () => {
  let controller: ChatBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatBasketController],
    }).compile();

    controller = module.get<ChatBasketController>(ChatBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
