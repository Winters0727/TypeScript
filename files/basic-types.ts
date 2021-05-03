// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }. I'll be ${ age + 1 } years old next month.`;

// Array
let list: number[] = [1, 2, 3];
let genericList: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello'];
// x[3] = "world";

// Enum
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

let colorName: string = Color[2];
console.log(colorName);

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

let anyList: any[] = [1, true, "free"];
console.log(anyList[1]);

// Void
function warnUser(): void {
    console.log("This is my warning message");
}

let unusable: void = undefined;
unusable = null; // '--strictNullChecks'을 사용하지 않는다면...

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
    throw new Error(message);
}

// 반환 타입이 never로 추론된다.
function fail(): never {
    return error("Something failed");
}

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
    while (true) {

    }
}

// Object
declare function create(o: object | null): void;

create({ prop : 0 });
create( null );

// create( 42 );
// create( "string" );
// create( false );
// create( undefined );

// Type Assertions
let someValue: string = "this is a string";

// angle-bracket
let strLengthOne: number = (<string>someValue).length;

// as - JSX
let strLengthtwo: number = (someValue as string).length;