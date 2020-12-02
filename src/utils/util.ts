/**
 * Checks that a number type is actually a number and not NaN
 * @param input the number to be checked
 */
export function numberIsNumber(input: number): boolean {
    return Number(input) === input && !isNaN(input);
}

export function stringIsNumber(input: string): boolean {
    return !isNaN(Number(input)) && input !== "";
}
