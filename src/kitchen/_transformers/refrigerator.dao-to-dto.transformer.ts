import { Nullable } from 'src/_common/nullable.type';
import { RefrigeratorEntity } from '../entities/refrigerator.entity';
import { Refrigerator } from '../models/refrigerator.model';
import { IngridientDaoToDtoTransformer } from './ingridient.dao-to-dto.transformer';

export const RefrigeratorDaoToDtoTransformer = (
  entity?: RefrigeratorEntity,
): Nullable<Refrigerator> => {
  if (!entity) {
    return null;
  }
  const contains = IngridientDaoToDtoTransformer(entity.content);
  return new Refrigerator(entity.id, contains);
};
