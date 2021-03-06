import { BooleanProperty } from './boolean-property';

describe('BooleanProperty', () => {
  it('should work for null values', () => {
    let x = new BooleanPropertyTest();

    x.field = null;
    expect(x.field).toBe(false);

    x.field = undefined;
    expect(x.field).toBe(false);
  });

  it('should work for string values', () => {
    let x = new BooleanPropertyTest();

    (<any>x).field = 'hello';
    expect(x.field).toBe(true);

    (<any>x).field = 'true';
    expect(x.field).toBe(true);

    (<any>x).field = '';
    expect(x.field).toBe(true);

    (<any>x).field = 'false';
    expect(x.field).toBe(false);
  });
});


class BooleanPropertyTest {
  @BooleanProperty() public field: boolean;
}
