import { numberIsNumber, stringIsNumber } from './util';

test('Test number checking functions', () => {
    expect(numberIsNumber(4)).toBe(true);
    expect(numberIsNumber(NaN)).toBe(false);
    
    expect(stringIsNumber('asdf')).toBe(false);
    expect(stringIsNumber('123')).toBe(true);
    expect(stringIsNumber('1.2')).toBe(true);
    expect(stringIsNumber('123f')).toBe(false);
});