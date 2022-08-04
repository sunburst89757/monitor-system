import { Test, TestingModule } from '@nestjs/testing';
import { ErrorController } from './error.controller';

describe('ErrorController', () => {
  let controller: ErrorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorController],
    }).compile();

    controller = module.get<ErrorController>(ErrorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
