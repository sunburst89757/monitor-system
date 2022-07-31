import { Test, TestingModule } from '@nestjs/testing';
import { BehaviorService } from './behavior.service';

describe('BehaviorService', () => {
  let service: BehaviorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BehaviorService],
    }).compile();

    service = module.get<BehaviorService>(BehaviorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
