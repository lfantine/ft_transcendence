import { Test, TestingModule } from '@nestjs/testing';
import { User42Controller } from './user42.controller';

describe('User42Controller', () => {
  let controller: User42Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [User42Controller],
    }).compile();

    controller = module.get<User42Controller>(User42Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
