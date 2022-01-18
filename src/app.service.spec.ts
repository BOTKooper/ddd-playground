import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('KitchenService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns version', () => {
    const v = service.getVersion();
    expect(v).toBeDefined();
    expect(v).toEqual(
      expect.objectContaining({
        version: expect.stringContaining(''),
      }),
    );
  });
});
