import { Test, TestingModule } from '@nestjs/testing';
import { User42Service } from './user42.service';

describe('User42Service', () => {
  let service: User42Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User42Service],
    }).compile();

    service = module.get<User42Service>(User42Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
