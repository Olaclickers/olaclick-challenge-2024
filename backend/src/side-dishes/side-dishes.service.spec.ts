import { Test, TestingModule } from '@nestjs/testing';
import { SideDishesService } from './side-dishes.service';

describe('SideDishesService', () => {
  let service: SideDishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SideDishesService],
    }).compile();

    service = module.get<SideDishesService>(SideDishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
