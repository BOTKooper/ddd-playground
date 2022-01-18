import { Nullable } from './nullable.type';

export interface IRepository<T> {
  getById: (id: number) => Promise<Nullable<T>>;
  getByIds: (ids: number[]) => Promise<Map<number, Nullable<T>>>;
  create: (value: T) => Promise<T>;
  exists: (id: number) => Promise<boolean>;
  update: (id: number, value: T) => Promise<T>;
}
