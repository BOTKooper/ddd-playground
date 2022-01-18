export class Ingridient {
  public get name(): string {
    return this._name;
  }
  public get amount(): number {
    return this._amount;
  }

  constructor(private _name: string, private _amount: number) {
    if (_amount < 0) {
      throw new Error('amount must be greater than zero');
    }
  }
}
