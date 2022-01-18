import { Ingridient } from './ingridient.model';

describe('Ingridient', () => {
  it('create', () => {
    const ingridient = new Ingridient('cheese', 1);
    expect(ingridient).toBeDefined();
    expect(ingridient.name).toBe('cheese');
    expect(ingridient.amount).toBe(1);
  });

  it('create -> throw on invalid amount', () => {
    expect(() => {
      new Ingridient('cheese', -1);
    }).toThrow();
  });
});
