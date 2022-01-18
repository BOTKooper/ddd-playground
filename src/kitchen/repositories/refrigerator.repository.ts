import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Nullable } from '../../_common/nullable.type';
import { IRepository } from '../../_common/repository.interface';
import { RefrigeratorEntity } from '../entities/refrigerator.entity';
import { Refrigerator } from '../models/refrigerator.model';
import { RefrigeratorDaoToDtoTransformer } from '../_transformers/refrigerator.dao-to-dto.transformer';

@Injectable()
export class RefrigeratorRepository implements IRepository<Refrigerator> {
  constructor(
    @InjectRepository(RefrigeratorEntity)
    private readonly db: Repository<RefrigeratorEntity>,
  ) {}

  public async getById(id: number): Promise<Nullable<Refrigerator>> {
    const entity = await this.db.findOne(id);
    return RefrigeratorDaoToDtoTransformer(entity);
  }

  public async getByIds(ids: number[]): Promise<Map<number, Refrigerator>> {
    const entities = await this.db.find({ id: In(ids) });
    return ids.reduce((acc, id) => {
      const entity = entities.find((e) => e.id === id);
      acc.set(id, RefrigeratorDaoToDtoTransformer(entity));
      return acc;
    }, new Map());
  }

  public async exists(id: number): Promise<boolean> {
    return Boolean(await this.db.findOne(id));
  }

  public async create(value: Refrigerator): Promise<Refrigerator> {
    const entity = {
      id: value.id,
      contains: value.storedIngridients,
    };
    const [created] = await this.db.save([entity]);
    return RefrigeratorDaoToDtoTransformer(created);
  }

  public async update(id: number, value: Refrigerator): Promise<Refrigerator> {
    const updateResult = await this.db.update({ id }, value);
    if (!updateResult.affected) {
      throw new Error(`Error updating entity ${id}`);
    }
    return value;
  }
}
