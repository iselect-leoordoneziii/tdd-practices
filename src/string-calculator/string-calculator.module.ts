class StringCalculator {
    private _invocations: number = 0;
    public constructor(
        private parser: Parser<number[]>
    ) {}

    private _onInvoked(): void {
        this._invocations += 1;
    }

    public add(input: string, _: void = this._onInvoked()) {
        if(input === '') return 0;

        const numbers: number[] = this.parser.parse(input).filter(d => d <= 1000);
        const negatives: number[] = numbers.filter(d => d < 0);

        if(negatives.length > 0) {
            throw new Error(`negatives [${negatives.join(',')}] not allowed`);
        }

        return numbers.reduce((acc, number) => acc + number, 0);
    }

    public getCalledCount(): number {
        return this._invocations;
    }
}

export default StringCalculator;