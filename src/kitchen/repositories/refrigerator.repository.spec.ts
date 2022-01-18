import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefrigeratorEntity } from '../entities/refrigerator.entity';
import { Refrigerator } from '../models/refrigerator.model';
import { RefrigeratorRepository } from './refrigerator.repository';

describe('KitchenService', () => {
  let service: RefrigeratorRepository;
  let entityRepo: Repository<RefrigeratorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefrigeratorRepository,
        {
          provide: getRepositoryToken(RefrigeratorEntity),
          useValue: {
            findOne: (id: number) => {
              const ent = new RefrigeratorEntity();
              ent.content = [];
              ent.id = id;
            },
            find: () => {
              const ent = new RefrigeratorEntity();
              return [ent];
            },
            save: (v: any[]) => {
              return v.map((v1) => ({ ...v1, content: [] } as any));
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            update: (): void => {},
          },
        },
      ],
    }).compile();

    service = module.get<RefrigeratorRepository>(RefrigeratorRepository);
    entityRepo = module.get<Repository<RefrigeratorEntity>>(
      getRepositoryToken(RefrigeratorEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('finds record', async () => {
      jest
        .spyOn(entityRepo, 'findOne')
        .mockImplementationOnce((id) => ({ id, content: [] } as any));
      const r = await service.getById(1);
      expect(r).toBeDefined();
      expect(r).not.toBe(null);
      expect(r.id).toBe(1);
    });

    it('null', async () => {
      jest.spyOn(entityRepo, 'findOne').mockImplementationOnce(() => null);
      const r = await service.getById(1);
      expect(r).toBeDefined();
      expect(r).toBe(null);
    });
  });

  describe('getByIds', () => {
    it('null', async () => {
      jest.spyOn(entityRepo, 'find').mockImplementationOnce(async () => []);
      const r = await service.getByIds([1]);
      expect(r).toBeDefined();
      expect(r.get(1)).toBe(null);
    });

    it('finds', async () => {
      jest
        .spyOn(entityRepo, 'find')
        .mockImplementationOnce(async () => [{ id: 1, content: [] }]);
      const r = await service.getByIds([1]);
      expect(r).toBeDefined();
      expect(r.get(1)).not.toBe(null);
      expect(r.get(1)).toEqual(new Refrigerator(1, []));
    });
  });

  describe('exists', () => {
    it('true', async () => {
      jest.spyOn(entityRepo, 'findOne').mockImplementationOnce(() => null);
      await expect(service.exists(1)).resolves.toBe(false);
    });

    it('true', async () => {
      jest
        .spyOn(entityRepo, 'findOne')
        .mockImplementationOnce(() => ({ id: 1 } as any));
      await expect(service.exists(1)).resolves.toBe(true);
    });
  });

  describe('create', () => {
    it('creates', async () => {
      const save = jest.spyOn(entityRepo, 'save');
      const value = new Refrigerator(1, []);
      await service.create(value);
      expect(save).toBeCalledWith([{ id: 1, contains: [] }]);
    });
  });

  describe('update', () => {
    it('success', async () => {
      jest
        .spyOn(entityRepo, 'update')
        .mockImplementationOnce(async () => ({ affected: 1 } as any));
      const r = await service.update(1, new Refrigerator(1, []));
      expect(r.id).toBe(1);
    });

    it('nope', async () => {
      jest
        .spyOn(entityRepo, 'update')
        .mockImplementationOnce(async () => ({ affected: 0 } as any));
      await expect(() =>
        service.update(1, new Refrigerator(1, [])),
      ).rejects.toThrow();
    });
  });
});
