import { Nullable } from './nullable.type';

type IStorage<T> = Map<number, T>;

const maps: { [name: string]: Map<unknown, unknown> } = {};

export class AsyncStorage<T extends { id: number }> {
  private storage: IStorage<T> = new Map();

  constructor(obj: new (...args: any) => T) {
    const name = obj.name;
    const mapExists = name in maps;
    if (!mapExists) {
      maps[name] = new Map();
    }
    this.storage = maps[name] as unknown as IStorage<T>;
  }

  public async findById(id: number): Promise<Nullable<T>> {
    const found = this.storage.get(id);
    return found || null;
  }

  public async findByIdIn(ids: number[]): Promise<IStorage<T>> {
    return ids.reduce((acc, id) => {
      acc.set(id, this.storage.get(id) || null);
      return acc;
    }, new Map());
  }

  public async delete(id: number): Promise<void> {
    this.storage.set(id, undefined);
  }

  public async create(value: T): Promise<T> {
    const amountExists = Array.from(this.storage.keys()).length;
    this.storage.set(amountExists + 1, value);
    return value;
  }

  public async put(id: number, value: T): Promise<T> {
    this.storage.set(id, value);
    return value;
  }

  public async exists(id: number): Promise<boolean> {
    return this.storage.has(id);
  }
}
