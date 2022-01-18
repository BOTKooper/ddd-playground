import { Ingridient } from './ingridient.model';
import { Refrigerator } from './refrigerator.model';

describe('Refrigerator', () => {
  const id = 1;
  const ingridient1 = new Ingridient('first', 5);
  const ingridient2 = new Ingridient('second', 5);

  describe('create', () => {
    it('creates new without ingridients', () => {
      const refrigerator = new Refrigerator(id, []);
      const content = refrigerator.storedIngridients;
      expect(refrigerator).toBeDefined();
      expect(refrigerator.id).toBe(id);
      expect(content.length).toBe(0);
    });

    it('creates new with one ingridient', () => {
      const refrigerator = new Refrigerator(id, [ingridient1]);
      const content = refrigerator.storedIngridients;
      expect(refrigerator).toBeDefined();
      expect(refrigerator.id).toBe(id);
      expect(content.length).toBe(1);
      expect(content[0]).toEqual(ingridient1);
    });

    it('creates new with multiple ingridients', () => {
      const refrigerator = new Refrigerator(id, [ingridient1, ingridient2]);
      const content = refrigerator.storedIngridients;
      expect(refrigerator).toBeDefined();
      expect(refrigerator.id).toBe(id);
      expect(content.length).toBe(2);
      expect(content[0]).toEqual(ingridient1);
      expect(content[1]).toEqual(ingridient2);
    });
  });

  describe('add', () => {
    it('adds ingridient', () => {
      const refr = new Refrigerator(id, []);
      refr.addIngridient(ingridient1);
      const content = refr.storedIngridients;
      expect(content.length).toEqual(1);
      expect(content[0]).toEqual(ingridient1);
    });

    it('add ingridient -> throws amount < 1', () => {
      const refr = new Refrigerator(id, []);
      expect(() =>
        refr.addIngridient(new Ingridient('something', 0)),
      ).toThrow();
      const content = refr.storedIngridients;
      expect(content.length).toEqual(0);
    });

    it('bulk add ingridients -> throw amount < 1', () => {
      const refr = new Refrigerator(id, []);
      expect(() =>
        refr.bulkAddIngridients([
          new Ingridient('something1', 0),
          new Ingridient('something2', 0),
        ]),
      ).toThrow();
      const content = refr.storedIngridients;
      expect(content.length).toEqual(0);
    });
  });

  describe('take', () => {
    it('single take ingridient', () => {
      const amountToTake = 2;
      const refr = new Refrigerator(id, [ingridient1]);
      refr.takeIngridient(new Ingridient('first', amountToTake));
      const content = refr.storedIngridients;
      expect(content.length).toEqual(1);
      expect(content[0]).toEqual(
        new Ingridient('first', ingridient1.amount - amountToTake),
      );
    });

    it('single take ingridient -> throws insufficient ingridients', () => {
      const amountToTake = 7;
      const refr = new Refrigerator(id, [ingridient1]);
      expect(() =>
        refr.takeIngridient(new Ingridient('first', amountToTake)),
      ).toThrow();
      const content = refr.storedIngridients;
      expect(content.length).toEqual(1);
      expect(content[0]).toEqual(ingridient1);
    });

    it('bulk adds ingridient', () => {
      const amountToTake = 2;
      const refr = new Refrigerator(id, [ingridient1, ingridient2]);
      refr.bulkTakeIngridients([
        new Ingridient('first', amountToTake),
        new Ingridient('second', amountToTake),
      ]);
      const content = refr.storedIngridients;
      expect(content.length).toEqual(2);
      expect(content[0]).toEqual(
        new Ingridient('first', ingridient1.amount - amountToTake),
      );
      expect(content[1]).toEqual(
        new Ingridient('second', ingridient2.amount - amountToTake),
      );
    });

    it('bulk add -> throw on insufficient ingridients', () => {
      const amountToTake = 7;
      const refr = new Refrigerator(id, [ingridient1, ingridient2]);
      expect(() =>
        refr.bulkTakeIngridients([
          new Ingridient('first', amountToTake),
          new Ingridient('second', amountToTake),
        ]),
      ).toThrow();
      const content = refr.storedIngridients;
      expect(content.length).toEqual(2);
      expect(content[0]).toEqual(ingridient1);
      expect(content[1]).toEqual(ingridient2);
    });
  });
});
