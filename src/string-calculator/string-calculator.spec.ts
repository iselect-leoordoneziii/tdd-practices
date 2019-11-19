import StringCalculator from "./string-calculator.module";
import NumberSetParser from "./utilities/number-set.parser";

describe('StringCalculator module', () => {
    let parser: NumberSetParser = new NumberSetParser();
    const stringCalculator: StringCalculator = new StringCalculator(parser);

    it('must initialize a new instance', () => {
        expect(stringCalculator).toBeInstanceOf(StringCalculator);
    });

    it('must return a number', () => {
        expect(typeof stringCalculator.add('')).toBe('number'); // 1
    });

    it('must return 0 for an empty string input', () => {
        expect(stringCalculator.add('')).toBe(0); // 2
    });

    it('must return sum for 1 input', () => {
        expect(stringCalculator.add('3')).toBe(3); // 3
    });

    it('must return sum for 2 inputs', () => {
        expect(stringCalculator.add('3,9')).toBe(12); // 4
    });

    it('must also handle \\n as delimiter', () => {
        expect(stringCalculator.add('1\n2,3')).toBe(6); // 5
    });

    it('must throw an error with input ending with delimiter', () => {
        expect(() => stringCalculator.add('1,\n')).toThrow(new Error('INVALID input')); // 6
    });

    it('must handle substitution of delimeters', () => {
        expect(stringCalculator.add('//;\n1;2')).toBe(3); // 7
    });

    it('must throw an error with input having negatives', () => {
        expect(() => stringCalculator.add('//;\n1;-2')).toThrow(new Error('negatives [-2] not allowed')); // 8
    });

    it('must throw an error with input having negatives and show all negatives on error message', () => {
        expect(() => stringCalculator.add('//;\n1;-2;2;-10')).toThrow(new Error('negatives [-2,-10] not allowed')); // 9
    });

    it('must return the number of times the Add method was invoked', () => {
        expect(stringCalculator.getCalledCount()).toBe(9);
    });

    it('must ignore numbers greater than 1000', () => {
        expect(stringCalculator.add('//;\n1220;137;2;1000')).toBe(1139);
    });

    it('must accept bracketed delimiters as substitute', () => {
        expect(stringCalculator.add('//[***]\n1***2***3')).toBe(6);
    });

    it('must accept multiple bracketed delimiters as substitute', () => {
        expect(stringCalculator.add('//[*][%]\n1*2%3')).toBe(6);
    });

    it('must accept multiple bracketed delimiters with more than one char as substitute', () => {
        expect(stringCalculator.add('//[**][%%]\n1**2%%3')).toBe(6);
    });
});