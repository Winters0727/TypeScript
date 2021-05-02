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

