# TypeScript 기본

JavaScript는 '동적 타입 언어'(Runtime 시에 타입을 결정)이기 때문에 Runtime이 될 때까지 사용되는 변수의 타입을 알 수 없다. 그렇기 때문에 TypeScript를 사용하여 '정적 타입 언어'(Develop 시에 타입을 결정)처럼 프로그래밍을 할 수 있다.

다음 예시를 보자.

```javascript
// 'toLowerCase' 프로퍼티에 접근
// 'message' 변수를 정의하고 'toLowerCase' 메서드를 호출
message.toLowerCase();

// 'message'를 호출해볼까?
message();
```

상기의 코드를 분석해보자.

- `message`는 호출 가능한 객체인가?
- `message`는 `toLowerCase` 프로퍼티를 가지는가?
- 가진다면, `toLowerCase` 프로퍼티는 호출 가능한가?
- 두 객체 모두 호출 가능하다면, 어떤 값을 반환하는가?

`toLowerCase`는 호출한 객체를 `string` 래퍼 객체로 감싸서 대문자를 소문자로 변환하는 메서드다. 그러므로 `toLowerCase`를 호출하는 `message`는 문자열이나 문자열로 변환 가능한 값이어야 한다.

```javascript
const message = 'Hello, World!';
```

`message`는 문자열이기 때문에 `message.toLowerCase();`는 정상적으로 작동한다. 하지만, 문자열은 호출 가능한 객체가 아니기 때문에 `message();`에서 에러가 발생한다.

```bash
TypeError : message is not function
```

그렇다면 프로그래밍 과정에서 `message`가 호출 가능한 객체인지 검증하면 되는 것이 아닌가? 앞에서 언급했듯이 JavaScript는 동적 타입 언어이기 때문에 Runtime 시 까지 `message`의 타입을 알 수가 없다. 간접적으로나마 `typeof` 키워드를 통해 Runtime 시 `message`의 타입을 확인할 수 있다.

하지만, 상기 방법도 `string`, `number`와 같은 원시 자료형에 대해서만 적용할 수 있다. `function`는 `Object`로 체이닝되어 있기 때문에 동일한 방법을 적용할 수 없다.

이러한 문제들을 해결하기 위해 JavaScript를 '정적 타입 언어'처럼 사용하는 방법이 개발되었다.



### 정적 타입 확인

TypeScript는 정적 타입 확인 기능을 제공한다. 그렇기에 코드를 작성할 때마다 파일을 보존하고 작성한 코드를 확인하여 에러가 발생하는지 즉시 확인할 수 있다. TypeScript는 type-checker를 통해 코드를 실행하기 전에 발생할 수 있는 에러를 확인할 수 있다.

```typescript
const message = 'hello';

message();
// This expression is not callable.
// Type 'String' has no call signatures.
```



### 예외 처리

JavaScript는 유연한 언어이기 때문에 다음과 같이 존재하지 않는 프로퍼티를 참조할 때, runtime 시에 에러를 발생시키지 않고 `undefined`를 반환한다.

```javascript
const user = {
    name : "Daniel",
    age : 26,
};

user.location; // undefined
```

TypeScript는 이러한 에러 조차 허용하지 않기 때문에 다음과 같이 에러 메세지를 보여준다.

```typescript
const user = {
    name : "Daniel",
    age : 26,
};

user.location;
// Property 'location' does not exist on type '{name : string; age : number;}'.
```

TypeScript에서 잡아주는 예외는 다음과 같은 것들이 있다.

- 오타
- 호출되지 않은 함수
- 기본 논리 에러들



### 타입 도구

TypeScript는 프로그래밍 과정에서 실수에 의한 에러를 잡아줄 뿐만 아니라 그러한 실수를 방지해주는 기능도 제공한다.

type-checker는 프로그래밍 과정에서 변수 및 프로퍼티 접근 과정에서 올바른 접근인지 확인할 수 있는 정보를 제공한다. 그래서 TypeScript를 지원하는 에디터는 "긴급 조치" 기능을 제공하여 에러를 자동으로 고쳐주고 코드를 쉽게 리팩토링할 수 있는 방안을 제안한다.



### `tsc`, TypeScript 컴파일러

**타입스크립트 설치**

- 전역 설치

  ```bash
  npm install -g typescript
  ```

- 로컬 설치(node_modules)

  ```bash
  npx install typescript
  ```



**TypeScript 컴파일러 실행**

`tsc` 키워드와 변환할 TypeScript 파일명을 입력한다.

```bash
tsc filename.ts
```

컴파일링의 결과물로 JavaScript 파일(`filename.js`)가 생성된다.

`--target` 키워드를 통해 JavaScript의 버전을 지정할 수도 있다.

```bash
tsc --target ES6 filename.ts
```

컴파일링 과정에서 에러가 발생하면 관련 내용이 출력된다.

```bash
test.ts(61,46): error TS2554: Expected 1 arguments, but got 2.
```

하지만, 에러와는 별개로 컴파일링은 정상적으로 진행된다. 실수를 줄이기 위해 방어적으로 프로그래밍을 하고 싶다면 `--noEmitOnError` 컴파일러 옵션을 사용하면 된다.

```bash
tsc --noEmitOnError filename.ts
```

컴파일링 과정에서 에러가 발생하면 에러가 출력되지 않으며, `filename.js` 파일은 생성 및 변경되지 않는다.



### 명시적 타입 선언

다음과 같이 `hello.ts` 파일을 작성해보자.

```typescript
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}
```

`greet` 함수의 인자인 `person`과 `date`의 타입은 정의되지 않았다. 입력될 인자의 타입을 명시적으로 정의해보자.

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

변수를 정의할 때 매번 명시적 타입 선언을 할 필요는 없다. TypeScript가 명확한 변수에 대해서는 타입을 자동으로 정의해주기 때문이다.

```typescript
let msg = "Hello, World!"; // msg: string
```

그렇기 때문에 타입 시스템에 의해 자동으로 타입이 정의될 수 있는 경우에는 명시적 타입 선언을 하지 않는 편이 좋다.



### 타입 제거

인자의 타입을 다시 제거해보자.

```typescript
"use strict";
function greet(person, date) {
    console.log("Hello " + person + ", today is " + date.toDateString() + "!");
}
greet("Maddison", new Date());
```

타입 선언문을 제거했을 때, 변환된 JavaScript 파일은 어떻게 변할까?

타입 선언문을 제거해도 생성된 `hello.js` 파일은 변화가 없다. 타입 선언문은 TypeScript 컴파일러에게 변수의 타입을 확인시키기 위한 것이지 JavaScript 컴파일러를 위한 것이 아니기 때문이다. 따라서, 타입 선언문이 없다해도 JavaScript 파일의 Runtime 시에 영향을 주지 않는다.

하지만, 우리는 이미 정적 타입 언어가 가지는 장점이 무엇인지 안다. 따라서, TypeScript 파일로 코드를 작성한 뒤에 TypeScript 컴파일러로 변환된 JavaScript 파일을 사용하는 방법이 안전하다.



### 엄격한 타입 기능

TypeScript는 여러 개의 엄격한 타입-확인 기능을 설정할 수 있다. 예를 들어, `strict` 기능을 설정할 경우에는 CLI에 `--strict` 또는 `tsconfig.json` 파일에 `"strict" : true`를 통해 엄격한 타입-확인 기능을 사용할 수 있다. 이 외에도 가장 많이 사용되어 알아야할 기능으로는 `noImplicitAny`와 `strictNullChecks`가 있다.

**`noImplicitAny`**

TypeScript의 타입 중에 타입을 추론하지 않는 느슨한 타입인 `any`가 있다. `any`로 타입을 선언한다는 것은 평범한 JavaScript문과 다를 바 없다. 그렇기에 `any`를 사용하는 것은 TypeScript를 사용하는 의미가 없다는 것과 마찬가지다. 그러므로 `noImplicitAny` 기능을 사용하여 `any`로 암시적 추정되는 타입에 대해 에러를 발생시켜 에러를 방지한다.

**`strictNullChecks`**

기본적으로 `null`과 `undefined`는 어떤 타입의 변수에도 적용이 가능하다. 하지만, 이를 사용하고 기억하지 않는 것은 수 많은 에러를 양산할 수 있다. `strictNullChecks` 기능을 사용하면 `null`과 `undefined`를 사용할 때 명시적으로 사용해야하기 때문에 에러를 방지한다.