class NumberSetParser implements Parser<number[]> {
    private _defaultDelimiter = ',';
    private _delimiters: string[] = ['\n', ','];
    private _patterns: IPatternMap<RegExp> = {
        'capture-delimiters': new RegExp('(?<=\\[).+?(?=\\])', 'g'),
        'capture-substitute': new RegExp('^\\/\\/(.+)\\n([\\s\\S.]+)')
    }

    public constructor() {}

    private get _replacer(): RegExp {
        let _regex = [...this._delimiters.join('|')].map(s => !s.match(/[a-zA-Z0-9|]/) ? ("\\" + s) : s);
        return new RegExp(`(${_regex.join('')})`, 'g');
    }

    private _chunk(input: string): string {
        let chunks = input.match(this._patterns['capture-substitute']);

        if(chunks !== null) {
            this._delimiters = chunks[1].match(this._patterns['capture-delimiters']) || [chunks[1]];
            input = chunks[2];
        }

        return input;
    }

    public parse(input: string): number[] {
        let _input = this._chunk(input);
        let parsed = _input.replace(this._replacer, this._defaultDelimiter).split(this._defaultDelimiter);

        if(parsed.includes('')) {
            throw new Error('INVALID input');
        }
        
        return parsed.map(Number);
    }
}

export default NumberSetParser;