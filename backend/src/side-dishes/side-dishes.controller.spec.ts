import { Test, TestingModule } from '@nestjs/testing';
import { SideDishesController } from './side-dishes.controller';
import { SideDishesService } from './side-dishes.service';

describe('SideDishesController', () => {
  let controller: SideDishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SideDishesController],
      providers: [SideDishesService],
    }).compile();

    controller = module.get<SideDishesController>(SideDishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
