import NumberSetParser from "./number-set.parser";

describe('NumberSetParser module', () => {
    const parser: NumberSetParser = new NumberSetParser();

    it('must initialize a new instance', () => {
        expect(parser).toBeInstanceOf(NumberSetParser);
    });

    it('must throw error if input is empty', () => {
        expect(() => parser.parse('')).toThrowError(new Error('INVALID input'));
    });

    it('must return the single parsed string to number', () => {
        expect(parser.parse('3')).toBeInstanceOf(Array);
        expect(parser.parse('3')).toStrictEqual([3]);
    });

    it('must return the single parsed string number to number array', () => {
        expect(parser.parse('3')).toBeInstanceOf(Array);
        expect(parser.parse('3')).toStrictEqual([3]);
    });

    it('must return the 2 parsed string number as number array', () => {
        expect(parser.parse('3,9')).toBeInstanceOf(Array);
        expect(parser.parse('3,9')).toStrictEqual([3,9]);
    });

    it('must return correct number array with \\n as delimiter', () => {
        expect(parser.parse('1\n2,3')).toBeInstanceOf(Array);
        expect(parser.parse('1\n2,3')).toStrictEqual([1,2,3]);
    });

    it('must return correct number array when input has substitution of delimeters', () => {
        expect(parser.parse('//;\n1;2')).toBeInstanceOf(Array);
        expect(parser.parse('//;\n1;2')).toStrictEqual([1,2]);
    });

    it('must return correct number array with negative numbers', () => {
        expect(parser.parse('//;\n1;2')).toBeInstanceOf(Array);
        expect(parser.parse('//;\n1;-2')).toStrictEqual([1,-2]);
    });

    it('must return correct number array with multiple negative numbers', () => {
        expect(parser.parse('//;\n1;-2;2;-10')).toBeInstanceOf(Array);
        expect(parser.parse('//;\n1;-2;2;-10')).toStrictEqual([1,-2,2,-10]);
    });

    it('must return correct number array with numbers > 1000', () => {
        expect(parser.parse('//;\n1220;137;2;1000')).toBeInstanceOf(Array);
        expect(parser.parse('//;\n1220;137;2;1000')).toStrictEqual([1220,137,2,1000]);
    });

    it('must return correct number array with numbers > 1000', () => {
        expect(parser.parse('//;\n1220;137;2;1000')).toBeInstanceOf(Array);
        expect(parser.parse('//;\n1220;137;2;1000')).toStrictEqual([1220,137,2,1000]);
    });

    it('must return correct number array with bracketed delimiters on substitute', () => {
        expect(parser.parse('//[***]\n1***2***3')).toBeInstanceOf(Array);
        expect(parser.parse('//[***]\n1***2***3')).toStrictEqual([1,2,3]);
    });

    it('must return correct number array with multiple bracketed delimiters on substitute', () => {
        expect(parser.parse('//[*][%]\n1*2%3')).toBeInstanceOf(Array);
        expect(parser.parse('//[*][%]\n1*2%3')).toStrictEqual([1,2,3]);
    });

    it('must return correct number array with multiple bracketed delimiters with more than one char as substitute', () => {
        expect(parser.parse('//[**][%%]\n1**2%%3')).toBeInstanceOf(Array);
        expect(parser.parse('//[**][%%]\n1**2%%3')).toStrictEqual([1,2,3]);
    });
});