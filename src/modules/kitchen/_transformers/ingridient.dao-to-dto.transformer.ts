import { RefrigeratorEntity } from '../entities/refrigerator.entity';
import { Ingridient } from '../models/ingridient.model';

export const IngridientDaoToDtoTransformer = (
  entity: RefrigeratorEntity['content'],
): Ingridient[] => {
  return entity.map(
    (contentItem) => new Ingridient(contentItem.name, contentItem.amount),
  );
};
