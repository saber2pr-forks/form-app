import { numberIsNumber, positiveOrZero, stringIsNumber } from './util';

test('Test number checking functions', () => {
    expect(numberIsNumber(4)).toBe(true);
    expect(numberIsNumber(NaN)).toBe(false);
    
    expect(stringIsNumber('asdf')).toBe(false);
    expect(stringIsNumber('123')).toBe(true);
    expect(stringIsNumber('1.2')).toBe(true);
    expect(stringIsNumber('123f')).toBe(false);
});

test('Test positiveOrZero', () => {
    expect(positiveOrZero(2134)).toBe(2134);
    expect(positiveOrZero(-123)).toBe(0);
    expect(positiveOrZero(0)).toBe(0);
    expect(positiveOrZero(NaN)).toBe(NaN);
})