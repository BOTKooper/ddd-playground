import { Ingridient } from './ingridient.model';

type StoredIngridients = { [P in Ingridient['name']]: number };

export class Refrigerator {
  private _id: number;
  private _storedIngridients: StoredIngridients = {};

  public get storedIngridients(): Ingridient[] {
    const storedIngrodients = Object.keys(this._storedIngridients);
    return storedIngrodients.map((name: string) =>
      this._getIngridientObject(name),
    );
  }

  public get id(): number {
    return this._id;
  }

  constructor(id: number, content: Ingridient[]) {
    this._id = id;
    content.forEach((ingridient) => this.addIngridient(ingridient));
  }

  private _getIngridientObject(ingridientName: string): Ingridient {
    const amount = this._storedIngridients[ingridientName] || 0;
    return new Ingridient(ingridientName, amount);
  }

  public addIngridient(ingridient: Ingridient): this {
    const ctx = this.addIngridient.name;
    if (ingridient.amount < 1) {
      throw new Error(`Invalid amount passed to ${ctx} (amount < 1)`);
    }
    this._storedIngridients[ingridient.name] =
      (this._storedIngridients[ingridient.name] || 0) + ingridient.amount;
    return this;
  }

  public bulkAddIngridients(ingridients: Ingridient[]): this {
    ingridients.forEach((ingridient) => this.addIngridient(ingridient));
    return this;
  }

  public takeIngridient(ingridient: Ingridient): this {
    const currentAmount = this._storedIngridients[ingridient.name] || 0;
    if (ingridient.amount > currentAmount) {
      throw new Error(
        `Not enough ${ingridient.name} ingridient, ${{
          requested: ingridient.amount,
          have: currentAmount || 0,
        }}`,
      );
    }
    this._storedIngridients[ingridient.name] -= ingridient.amount;
    return this;
  }

  public bulkTakeIngridients(ingridients: Ingridient[]): this {
    const errors: Error[] = [];
    ingridients.forEach((ingridient) => {
      try {
        this.takeIngridient(ingridient);
      } catch (err) {
        errors.push(err);
      }
    });
    if (errors.length) {
      throw new Error(
        `Failed to take ingridients, errors: ${JSON.stringify(errors)}`,
      );
    }
    return this;
  }
}
