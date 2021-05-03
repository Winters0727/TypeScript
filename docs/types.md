# TypeScript 타입

### 원시 자료 타입 : `string`, `number`, `boolean`

JavaScript는 기본 원시 자료 타입으로 `string`, `number`, `boolean`을 가지며, runtime 시에 `typeof` 키워드로 확인이 가능하다. 또한, 이들은 TypeScript에서도 타입으로 활용된다.

- `string` : `"Hello, world"`와 같은 문자열
- `number` : `int`나 `float`을 구분하지 않는 숫자
- `boolean` : `true`와 `false`



### 배열

배열의 타입은 `type[]` 또는 제네릭을 사용하여 `Array<type>`으로 선언한다.

```typescript
const numberArray: number[] = [1, 2, 3, 4, 5];
// const numberArray: Array<number> = [1, 2, 3, 4, 5];
```



### `any`

`any`는 특별한 타입으로 TypeScript의 타입 확인 기능을 무시하는 타입이다.

```typescript
let obj: any = { x : 0 };

obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

명시적으로 타입을 선언하지 않으면 암시적으로 `any` 타입으로 추론된다. 암시적 추론을 막기 위해서는 `noImplicitAny` 기능을 사용하면 된다.



### 변수에 타입 선언

`const`, `let`, `var` 키워드를 사용하여 변수를 선언할 때, 부가적으로 타입 선언문을 추가하여 변수의 타입을 지정할 수 있다.

```typescript
let myName: string = "Alice";
```

대부분의 경우에는 상기 처럼 명시적 타입 선언을 할 필요가 없다. TypeScript 컴파일러는 자동으로 변수의 타입을 추론하기 때문이다. 예를 들어,

```typescript
let myName = "Alice";
```

앞의 코드를 위와 같이 작성해도 TypeScript 컴파일러에 의해 `myName`의 타입은 `string`으로 추론된다.



### 함수

**인자의 타입 선언**

함수를 선언할 때, 함수의 인자 뒤에 타입 선언문을 추가하여 받을 인자의 타입을 지정할 수 있다. 인자의 타입 선언문은 인자 뒤에 작성하면 된다.

```typescript
function greet(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
}
```

인자의 타입이 선언되었다면 함수 호출 시에 인자의 타입 확인 절차가 이루어진다.



**반환값의 타입 선언**

반환값의 타입을 지정할 수도 있다. 선언한 함수의 이름 뒤에 타입 선언문을 추가하면 된다.

```typescript
function getFavoriteName(): number {
    return 29;
}
```

대부분의 변수 타입 선언문이 그러하듯, 반환값의 타입을 평소에 지정할 필요는 없다. TypeScript 컴파일러에 의해 `return` 문의 반환값의 타입은 자동으로 추론되기 때문이다. 그러므로 특별한 목적이 있지 않는 한 반환값의 타입을 지정할 필요는 없다.



**익명 함수**

익명 함수는 일반 함수 선언문과는 조금 차이가 있다. 함수가 나타날 때, TypeScript 컴파일러는 어떻게 함수가 호출되고 파라미터의 타입이 자동으로 주어질지 결정한다.

```typescript
// 배열의 타입이 선언되지 않았으므로 TypeScript 컴파일러는 에러를 예상할 것이다.
const names = ["Alice", "Bob", "Eve"];

names.forEach(function(s) {
    console.log(s.toUppercase());
    // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

names.forEach((s) => {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

익명 함수의 인자 `s`의 타입이 선언되지 않았어도 TypeScript 컴파일러는 `forEach` 함수에서 지정된 타입들로부터 배열의 인자의 타입을 추론하여 `s`의 타입을 추론했다. 이를 '문맥상의 타입 추론(contextual typing)'이라 한다.



### 객체 타입

원시 자료 타입을 제외하면 객체 타입이 가장 자주 사용할 타입일 것이다. 객체 타입을 정의하기 위해서는 객체의 프로퍼티에 대한 타입을 개별적으로 선언하면 된다.

```typescript
function printCoord(pt: { x : number; y : number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x : 3, y : 7 });
```

프로퍼티 간의 타입 선언문을 구분할 때는 `,`나 `;`를 사용하면 된다. 프로퍼티의 타입 선언문은 부가적이며, 타입 선언문이 없다면 `any`로 지정된다.



**부가적 프로퍼티**

JavaScript에서 프로퍼티의 값이 입력되지 않으면 자동으로 `undefined` 배정된다. TypeScript에서는 부가적 프로퍼티의 값을 읽어야 하므로 `?`를 사용하여 프로퍼티를 부가적 프로퍼티로 설정한다.

```typescript
// TypeScript
function printName(obj: { first: string; last?: string }) {
    // ...
}
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

```javascript
// JavaScript
function printName(obj: { first: string; last?: string }) {
  // 'obj.last'의 값이 없다면(undefined) 에러가 발생한다!
  console.log(obj.last.toUpperCase());
// 객체의 값이 'undefined'일 수 있다.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // 최신 자바스크립트 문법에서는 다음과 같이 '?'를 추가하여 undefined 여부를 확인할 수 있다.
  console.log(obj.last?.toUpperCase());
}
```



### 다중 타입

TypeScript의 타입 시스템은 다중 타입을 통해 여러가지 경우의 수를 주는 새로운 타입을 지정할 수 있다.



**다중 타입 정의**

다중 타입은 두 개 이상의 타입을 지정하여 지정된 타입들 중에 하나의 타입인 경우에 타입 확인을 허용하는 타입이다.

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// 통과!
printId(101);
// 통과!
printId("202");
// 에러!
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
// Type '{ myID: number; }' is not assignable to type 'number'.
```



**다중 타입 사용**

다중 타입은 유용한 기능이지만 사용 시의 주의 사항이 있다. 다중 타입으로 정의된 변수의 프로퍼티나 메서드를 사용할 때 다중 타입에 정의된 모든 타입에 허용된 프로퍼티와 메서드만 사용이 가능하다. 다음 예시를 보자.

```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}
```

위 코드는 `id`의 타입이 `string`일 때는 정상적으로 작동하지만, `number`일 경우에는 `toUpperCase()` 메서드를 갖지 않기 때문에 에러가 발생한다. 따라서, TypeScript는 이 에러를 감지하여 경고문을 보여주는 것이다.

이런 경우에는 타입에 따라 경우의 수를 더욱 세분화 해주는 편이 좋다. `typeof` 키워드를 사용하여 경우의 수를 세분화 해보자.

```typescript
function printId(id: number | string) {
  if (typeof id == "string") {
      console.log(id.toUpperCase());
  } else {
      console.log(id);
  }
}
```

배열의 경우에는 `Array.isArray`를 사용하면 된다.

```typescript
function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log("Hello, " + x.join(" and "));
    } else {
        console.log("Welcome lone traveler " + x);
    }
}
```

경우에 따라선 다음과 같이 다중 타입의 모든 타입에 적용되는 메서드가 있을 수도 있다.

```typescript
function getFirstThree(x: number[] | string) {
    // 배열, 문자열 모두 slice() 메서드를 사용할 수 있다.
    return x.slice(0, 3);
}
```



### 타입 별칭(Type Alias)

지금까지 객체 타입과 다중 타입을 명시적 타입 선언문으로 정의했다. 지금도 유용하지만, 자주 사용되는 타입을 저장해서 반복되는 타입 선언문을 하나의 변수에 저장하여 사용하면 더욱 유용할 것이다.

타입 별칭은 이러한 고민에 대한 해결책이 되어준다.

객체 타입에 대한 타입 별칭은 다음과 같다.

```typescript
type Point = {
    x: number;
    y: number;
};

// 앞의 예제와 동일하다.
function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
```

다중 타입의 경우에는 변수 선언문과 비슷하게 정의된다.

```typescript
type ID = number | string;
```

여기서 타입 별칭은 변수처럼 단순히 타입에 대한 별명을 가리키기 때문에 이미 존재하는 타입과 동일하면서 '다른' 타입을 생성하는데 사용할 수 없다. 다음 코드는 에러를 발생시킬 것처럼 보이지만, 실제로 TypeScript 컴파일러를 통해 실행시키면 잘 작동한다.

```typescript
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// sanitized 입력값을 생성한다.
let userInput = sanitizeInput(getInput());

// 동일한 변수에 다른 문자열을 할당할 수 있다.
userInput = "new input";
```



### 인터페이스

인터페이스 선언문은 객체 타입을 지정하는 또 다른 방법이다.

```typescript
interface Point {
    x: number;
    y: number;
};

function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
```

앞의 타입 별칭과 비슷하게 인터페이스도 익명 객체 타입처럼 작동한다.



### 타입 별칭과 인터페이스 비교

타입 별칭과 인터페이스는 서로 비슷하며, 많은 경우에 어떤 것을 선택해도 상관 없다. 인터페이스가 가지는 대부분의 특징은 타입 별칭에서도 사용 가능한 것들이며, 주요한 차이점은 인터페이스는 한번 선언된 후에 확장이 가능한 반면, 타입 별칭은 한번 선언된 뒤에 추가적인 변경 및 확장이 불가능하다.



**Interface**

```typescript
// 인터페이스 확장
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey

// 기존에 존재하는 인터페이스에 새로운 필드 확장
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```



**Type Alias**

```typescript
// 교집합을 통한 타입 확장
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: Boolean 
}

const bear = getBear();
bear.name;
bear.honey;

// 타입 별칭은 한번 선언된 뒤에 변경이 불가능하다.
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.
```



그 외의 차이점으로는 다음과 같은 것들이 있다.

- TypeScript 4.2버전 이전에는 타입 별칭의 이름들은 에러메세지에서 나타나며, 때로는 익명 타입으로 취급되기도 했다. 그에 반해 인터페이스는 항상 에러메세지에서 이름으로 나타난다.
- 타입 별칭은 병합 선언에 사용될 수 없지만, 인터페이스는 사용 가능하다.
- 인터페이스는 객체의 형태를 선언할 때만 사용 가능하지, 원시 자료형을 다른 이름으로 정의하기 위해 사용될 수 없다.
- 인터페이스 이름들은 그들이 이름으로 사용되었을 경우에만 에러메세지에서 항상 원형으로 나타날 것이다.



### 타입 표명

경우에 따라서 TypeScript 컴파일러가 이해할 수 없는 정보를 다루어야할 때가 있을 것이다.

예를 들어, `document.getElementById`를 사용할 때, TypeScript 컴파일러는 반환 값의 타입을 `HTMLElement`로 예측하지만, 당신은 현재 페이지가 주어진 ID에 따라 `HTMLCanvasElement` 타입을 반환하는 것을 알고 있다.

이 경우에는 타입 표명을 통해 어떤 타입이 올지 세부적으로 지정할 수 있다.

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

또한, \<\> 괄호를 사용하여(`.tsx` 파일에서 작성될 경우) 타입 표명을 사용할 수도 있다.

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

타입 선언문과 비슷하게 타입 표명은 컴파일러에 의해 제거되고 런타임 시에 코드에 어떤 영향도 끼치지 않는다.

TypeScript는 타입을 특정하는 타입 표명만을 허용하기 때문에 다음과 같은 '불가능한' 강제변환을 방지한다.

```typescript
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

때때로는 TypeScript의 타입 표명에 대한 제약이 너무 보수적이기 때문에 허용 가능한 강제 변환에 대해서도 허용하지 않는 경우가 있을 수 있다. 이런 경우에는 `any`(또는 `unknown`) 타입을 표명하든가, 적절한 타입을 표명하면 된다.

```typescript
const a = (expr as any) as T;
```



### 리터럴 타입

`let`과 `var`로 선언된 변수들은 재할당이 가능한 반면 `const`로 선언된 변수는 재할당이 불가능하다. 따라서, `let`과 `var`로 선언된 변수들의 타입은 할당된 값의 타입으로 나타나는 반면, `const`로 선언된 변수의 타입은 할당된 값 자체가 나타난다.

`let`과 `var`로 선언된 변수라 할지라도 특정한 값을 타입으로 선언하면 `const`로 선언된 것처럼 사용된다.

```typescript
let x: "hello" = "hello";
// 통과!
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.
```

리터럴 조합을 통해 변수에 할당될 값들을 제한할 수 있다.

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

```typescript
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

리터럴이 아닌 객체 타입에도 적용이 가능하다.

```typescript
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
```

또한, `boolean` 타입의 값은 `true`와 `false` 밖에 없기 때문에 사실상 `true | false`나 마찬가지다.



**리터럴 인터페이스**

객체의 값을 초기화하면 TypeScript는 객체의 프로퍼티 값이 수정될 것이라고 가정한다. 예를 들어,

```typescript
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript는 `0`이 할당된 프로퍼티에 다시 `1`을 할당해도 에러를 발생시키지 않는다. 프로퍼티의 값이 `0`으로 초기화된 시점에서 타입이 `number`로 정의되지 `0`으로 정의된 것은 아니기 때문이다. 이는 `string`에도 똑같이 적용된다.

```typescript
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
```

하지만, 우리가 원하는 문자열이 아닌 다른 문자열이 입력되면 어떻게 될까? 타입이 `string`이므로 TypeScript는 에러를 발생시키지 않을 것이다.

이런 문제에 대해 2가지 해결책을 제시할 수 있다.

1. 각각의 위치에 타입 표명을 추가해 추론 방법을 변경한다.

   ```typescript
   // 변경 1:
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // 변경 2
   handleRequest(req.url, req.method as "GET");
   ```

   변경 1은 `req.method`는 항상 리터럴 타입 `GET`을 가지므로 그 필드에 다른 값이 할당되는 것을 방지하도록 의도한 것을, 변경 2는 `req.method`는 `GET` 값을 가지고 있다는 것을 의미한다. 

2. `as const`를 추가하여 모든 객체를 리터럴 타입으로 변환한다.

   ```typescript
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```

   `as const` 접미사는 `const`와 비슷하게 작동하지만, 타입 시스템에서 `string`과 `number`와 같은 일반 타입 대신 모든 프로퍼티는 리터럴 타입으로 할당된다는 것을 보장한다.



### `null`과 `undefined`

JavaScript에는 없거나 초기화 되지 않은 값들을 가리키는 두가지 원시 자료형을 가진다. `null`과 `undefined`

TypeScript도 각각에 상응하는 타입을 가진다. 이 값들이 어떻게 다루어지느냐는 `strictNullChecks` 설정에 달려있다.



**`strictNullChecks` off**

`null`과 `undefined`가 할당 될 수 있으며, 할당되는 프로퍼티의 타입은 `any`다. 이는 `null` 확인이 없는 언어들(C#, Java)와 유사하게 작동한다. `null` 확인을 하지 않으면 숨겨진 에러들이 발생할 수 있으므로 `strictNullChecks` 설정을 항상 켜두는 것을 추천한다.



**`strictNullChecks` on**

만약 값이 `null`이나 `undefined`라면 값에 대한 메서드나 프로퍼티를 사용하기 전에 검증 과정이 필요하다. 부가적 프로퍼티를 사용하기 전에 `undefined` 검증 과정을 거쳐 값이 `null`이 될 수 있는지 확인한다.

```typescript
function doSomething(x: string | undefined) {
  if (x === undefined) {
    // 아무것도 안함.
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```



**비-null 표명 연산자(후위연산자 `!`)**

TypeScript에는 명시적인 확인 없이도 `null`과 `undefined`를 제거하는 특수한 구문이 있다. 표현식 뒤에 `!`를 추가하면 이 값은 `null`이나 `undefined`가 아니라는 타입 표명이 된다.

```typescript
function liveDangerously(x?: number | undefined) {
  // 에러가 발생하지 않는다!
  console.log(x!.toFixed());
}
```



**열거형**

열거형은 TypeScript에 의해 JavaScript에 추가된 특징으로 가능한 상수 집합으로부터 하나의 값을 선택해 설명하는 것을 허용한다. 대부분의 TypeScript 특징과는 다르게 열거형은 JavaScript에서 타입-단계에서 처리되는 것이 아니라 런타임 시에 언어에 추가된다. 이러한 특징 때문에, 우리는 열거형의 존재를 인지하고 있어야 하며, 확신이 들기 전까지는 사용할 것을 고민할 필요가 있다.