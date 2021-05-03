// function printLabel(labeledObj: { label : string }) {
//     console.log(labeledObj.label);
// }

// let myObj = { size : 10, label : "Size 10 Object" };
// printLabel(myObj);

// Interface
interface LabeledValue {
    label : string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = { size : 10, label : "Size 10 Object" };
printLabel(myObj);

// Optional Properties
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }

// function createSquare(config: SquareConfig): {color : string; area : number} {
    // let newSquare = {color : "white", area : 100};
    // if (config.color) {
    //     newSquare.color = config.color;
    // }

    // if (config.width) {
    //     newSquare.area = config.width * config.width;
    // }

    // return newSquare;
// }

// let mySquare = createSquare({ color : "black" });

// Readonly Properties
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x : 10, y : 20 };
// p1.x = 5;

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12;
// ro.push(5);
// ro.length = 100;
// a = ro;

a = ro as number[];

// readonly vs const : const on variables / readonly on properties

// Excess Property Checks
// interface SquareConfig {
    // color?: string;
    // width?: number;
// }

// 추가 프로퍼티에 대해서는 인덱스 서명(string index signature)
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color : "white", area : 100};
    if (config.color) {
        newSquare.color = config.color;
    }

    if (config.width) {
        newSquare.area = config.width * config.width;
    }

    return newSquare;
}

// excess property checking
// let mySquare = createSquare({ colour: "red", width: 100 });

// 1. 타입 단언
// let mySquare = createSquare({ width : 100, opacity : 0.5 } as SquareConfig);

// 2. 다른 변수에 객체 할당
let squareOptions = { colour: "red", width: 100 };
// let mySqaure = createSquare(squareOptions);

// Function Types
