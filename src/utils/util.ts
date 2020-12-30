/**
 * Checks that a number type is actually a number and not NaN
 * @param input the number to be checked
 */
export function numberIsNumber(input: number): boolean {
    return Number(input) === input && !isNaN(input);
}

/**
 * Checks that a string type is a number and
 * @param input the number to be checked
 */
export function stringIsNumber(input: string): boolean {
    return !isNaN(Number(input)) && input !== "";
}

/**
 * If the input is less than zero, return 0. Otherwise, return the input.
 * @param input the number to be checked
 */
export function positiveOrZero(input: number) : number {
    if (isNaN(input)) return NaN; // don't overwrite NaNs so it doesn't go unnoticed
    return input >= 0 ? input : 0;
}
