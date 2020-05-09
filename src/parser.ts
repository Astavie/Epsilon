export class Input {

    source: string;
    position: number;

    constructor(source: string, position: number) {
        this.source = source;
        this.position = position;
    }

    nextChar(): Result<string> {
        var char = this.source.charAt(this.position);
        if (char.length == 0)
            return Result.Empty(this);
        return Result.Value(char, new Input(this.source, this.position + 1));
    }

    nextString(size: number): Result<string> {
        var string = this.source.substr(this.position, size);
        if (string.length != size)
            return Result.Empty(this);
        return Result.Value(string, new Input(this.source, this.position + size));
    }

    isDone() {
        return this.position >= this.source.length;
    }

}

export class Result<T> {

    hasValue: boolean;
    value: T;
    remainder: Input;
    expectations: string[];

    constructor(hasValue: boolean, value:T, remainder: Input, expectations: string[]) {
        this.hasValue = hasValue;
        this.value = value;
        this.remainder = remainder;
        this.expectations = expectations;
    }

    static Value<T>(value:T, remainder: Input, expectations: string[] = []) {
        return new Result(true, value, remainder, expectations);
    }

    static Empty<T>(remainder: Input, expectations: string[] = []):Result<T>  {
        return new Result(false, null, remainder, expectations);
    }

    getExpected():string {
        if (this.expectations.length > 2) {
            let sliced = this.expectations.slice(0, -1);
            return sliced.join(", ") + ", or " + this.expectations[this.expectations.length - 1];
        } else {
            return this.expectations.join(" or ");
        }
    }

    getError():string {
        let substr = this.remainder.source.substring(0, this.remainder.position);

        let columnStart = substr.lastIndexOf("\n") + 1;
        let columnEnd = this.remainder.source.indexOf("\n", columnStart);
        if (columnEnd == -1)
            columnEnd = this.remainder.source.length;

        let line = (substr.match(/\n/) || []).length;
        let column = this.remainder.position - columnStart;
        
        let string = this.remainder.source.substring(columnStart, columnEnd);
        let position = " ".repeat(column) + "^";
        let error = "Syntax error (line " + line + ", column " + column + "): expected " + this.getExpected();

        return "```\n" + string + "\n" + position + "\n" + error + "\n```";
    }

}

function isDigit(singleton:string) {
    let char = singleton.charCodeAt(0);
    return char >= 48 && char <= 57;
}

function isWhitespace(singleton:string) {
    return /\s/.test(singleton);
}

function fraction():Parser<number> {
    return new Parser((input:Input) => {
        let next = input.nextChar();
        let remainder = input;
        let num = "";

        while (next.hasValue && isDigit(next.value)) {
            num += next.value;
            remainder = next.remainder;
            next = remainder.nextChar();
        }

        return Result.Value(parseFloat("0." + num), remainder);
    });
}

export class Parser<T> {

    parseInput: (input:Input) => Result<T>

    constructor(parseInput: (input:Input) => Result<T>) {
        this.parseInput = parseInput;
    }

    parse(input:string) {
        return this.parseInput(new Input(input.trim(), 0));
    }

    static literal(string: string, caseSensitive = true):Parser<string> {
        if (caseSensitive) {
            return new Parser((input:Input) => {
                let substr = input.nextString(string.length);
                if (substr.value !== string)
                    return Result.Empty(input, ["`" + string + "`"]);
                
                return substr;
            });
        } else {
            return new Parser((input:Input) => {
                let substr = input.nextString(string.length);
                if (!substr.hasValue || substr.value.toUpperCase() !== string.toUpperCase())
                    return Result.Empty(input, ["`" + string + "`"]);
                
                return substr;
            });
        }
    }

    static value<T>(value:T):Parser<T> {
        return new Parser((input:Input) => Result.Value(value, input));
    }

    static natural():Parser<number> {
        return new Parser((input:Input) => {
            let next = input.nextChar();
            if (!next.hasValue || !isDigit(next.value))
                return Result.Empty(input, ["whole number"]);

            let remainder:Input;
            let num = "";
            do {
                num += next.value;
                remainder = next.remainder;
                next = remainder.nextChar();
            } while (next.hasValue && isDigit(next.value));

            return Result.Value(parseInt(num), remainder);
        });
    }

    static sign(positive: boolean):Parser<number> {
        let negative = this.literal("-");
        if (positive)
            negative = negative.or(this.literal("+"));
        return negative.optional().then(sign => sign == null || sign == "+" ? 1 : -1);
    }

    static number():Parser<number> {
        return this.sign(false).thenParse(
            minus => this.natural().thenParse(
                // Decimal
                whole => this.literal(".").thenParse(
                    () => fraction()
                ).fallback(0).then(fraction => minus * (whole + fraction))

                // Exponent
                .thenParse(
                    number => this.literal("e", false).thenParse(
                        () => this.sign(true).thenParse(
                            sign => this.natural().then(exponent => number * (10 ** (sign * exponent)))
                        )
                    ).fallback(number)
                )
            )
        ).expect("number");
    }

    thenParse<U>(builder: (value:T) => Parser<U>, ignoreWhitespace = false):Parser<U> {
        return new Parser((input:Input) => {
            // First do #1
            let value = this.parseInput(input);
            if (!value.hasValue)
                return Result.Empty(input, value.expectations);
            
            let remainder = value.remainder;
            if (ignoreWhitespace) {
                // Ignore whitespace
                let next = remainder.nextChar();
                while (next.hasValue && isWhitespace(next.value)) {
                    remainder = next.remainder;
                    next = remainder.nextChar();
                }
            }
            
            // Then do #2
            let value2 = builder(value.value).parseInput(remainder);
            return new Result(value2.hasValue, value2.value, value2.remainder, [...value.expectations, ...value2.expectations]);
        });
    }

    then<U>(builder: (value:T) => U):Parser<U> {
        return new Parser((input:Input) => {
            let value = this.parseInput(input);
            if (!value.hasValue)
                return Result.Empty(input, value.expectations);
            
            return Result.Value(builder(value.value), value.remainder, value.expectations);
        });
    }

    or(parser: Parser<T>):Parser<T> {
        return new Parser((input:Input) => {
            let first = this.parseInput(input);
            if (!first.hasValue) {

                let second = parser.parseInput(input);
                if (!second.hasValue)
                    return Result.Empty(input, [...first.expectations, ...second.expectations]);
                
                return second;
            }
            
            return first;
        });
    }

    fallback(fallback: T):Parser<T> {
        return new Parser((input:Input) => {
            let value = this.parseInput(input);
            if (value.hasValue) {
                return value;
            }
            return Result.Value(fallback, input, value.expectations);
        });
    }

    optional():Parser<T> {
        return new Parser((input:Input) => {
            let value = this.parseInput(input);
            if (value.hasValue) {
                return value;
            }
            return Result.Value(null, input, value.expectations);
        });
    }

    end():Parser<T> {
        return new Parser((input:Input) => {
            let value = this.parseInput(input);

            if (value.hasValue && !value.remainder.isDone()) {

                // Ignore whitespace
                let remainder = value.remainder;
                let next = remainder.nextChar();
                while (next.hasValue && isWhitespace(next.value)) {
                    remainder = next.remainder;
                    next = remainder.nextChar();
                }

                return Result.Empty(remainder, [...value.expectations, "end of input"]);
            }
            
            return value;
        });
    }

    expect(...expectations: string[]):Parser<T> {
        return new Parser((input:Input) => {
            let value = this.parseInput(input);

            if (!value.hasValue){ 
                return Result.Empty(input, expectations);
            }

            return Result.Value(value.value, value.remainder);
        });
    }

}
