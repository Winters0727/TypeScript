# TypeScript 객체 타입

JavaScript에서 데이터를 그룹으로 묶어 넘기는 기초적인 방법으로 객체를 사용했다. TypeScript에서는 이와 비슷하게 타입을 그룹으로 묶어 넘기는 기초적인 방법으로 객체 타입을 사용한다.

이미 앞에서 익명 객체 타입을 사용해왔다.

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello " + person.age;
}
```

또는, 타입 별칭과 인터페이스를 통해 정의하기도 했었다.

```typescript
// 타입 별칭
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.age;
}

// 인터페이스
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.age;
}
```



### 프로퍼티 변경자

객체 타입의 개별 프로퍼티는 몇가지 옵션을 지정할 수 있다. : 프로퍼티 타입, 프로퍼티 부가 여부, 프로퍼티 사용 가능 여부



**부가적 프로퍼티**

물음표(`?`)를 사용하면 프로퍼티에 부가적 속성을 부여할 수 있다.

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number; // 이 프로퍼티는 부가적 속성을 가진다.
  yPos?: number; // 이 프로퍼티는 부가적 속성을 가진다.
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape }); // 부가적 속성을 가진 프로퍼티는 필수적이지 않다.
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

만약 `strictNullChecks` 설정이 켜져있다면, TypeScript는 부가적 프로퍼티에 대해 `undefined`에 대한 경고 메세지를 보여줄 것이다.

JavaScript에서는 값이 설정되지 않았더라도 접근이 가능하며, `undefined`를 보여줄 것이다. 따라서, JavaScript에서는 이에 대한 처리가 필요하다.

```javascript
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // ...
}
```

또한, JavaScript에서 그러하듯 부가적 프로퍼티에 기본 값을 할당할 수 있다.

```typescript
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    // ...
}
```

`paintShape` 파라미터에 구조 분해 할당 패턴을 사용하고 `xPos`와 `yPos`에 기본 값을 제공했다. 이제 `xPos`와 `yPos`는 `paintShape`에 명시적으로 정의되어 있지만, 다른 호출 객체에서 사용하는 것은 선택적이다.

```typescript
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape);
// Cannot find name 'shape'. Did you mean 'Shape'?
  render(xPos);
// Cannot find name 'xPos'.
}
```

구조 분해 할당 패턴을 통해 `shape : Shape`는 "`shape` 프로퍼티로부터 `Shape` 값을 가져와 이를 변수명으로 재정의한다."는 의미다. 마찬가지로, `xPos : number`는 `number`라는 변수 명에 `xPos`에 할당된 값을 할당하여 정의한다.



**읽기전용(`readonly`) 프로퍼티**

TypeScript에서는 읽기전용(`readonly`) 프로퍼티를 지원한다. `readonly` 키워드는 런타임 시에 아무런 영향을 끼치지 않지만, 타입 확인 과정에서 타입이 재할당 되는 것을 방지한다.

```typescript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // 'obj.prop' 읽을 수 있다.
  console.log(`prop has the value '${obj.prop}'.`);

  // 하지만 재할당은 불가능하다.
  obj.prop = "hello";
// Cannot assign to 'prop' because it is a read-only property.
}
```

