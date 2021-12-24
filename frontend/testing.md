이 글은 다음 사이트의 내용을 정리하고 의견을 더한 글입니다. <br/>
https://css-tricks.com/front-end-testing-is-for-everyone/

-----

프론트 테스팅 방식에는 6가지 방식이 있다.

## Unit testing
- Level: Low
- Scope: 함수, 메소드 테스트
- Possible tools:, AVA, Jasmine, Jest, Karma, Mocha

```js
describe("sayHello function", () => {
  it("should return the proper greeting when a user doesn't pass a name", () => {
    expect(sayHello()).toEqual("Hello human!")
  })

  it("should return the proper greeting with the name passed", () => {
    expect(sayHello("Evgeny")).toEqual("Hello Evgeny!")
  })
})
```

## Integration testing
- Level: Medium
- Scope: Unit 간의 상호작용 테스트
- Possible tools: AVA, Jest, Testing Library

여러개의 unit 들이 결함없이 잘 돌아가는지 확인하는 방법. 컴포넌트와 함수가 상호작용이 잘 되는지 테스트할 수 있다.

```jsx
// Gretting.jsx
export const Greeting = () => {  
  const [showGreeting, setShowGreeting] = useState(false);  

 return (  
   <div>  
     <p data-testid="greeting">{showGreeting && sayHello()}</p>  
     <button data-testid="show-greeting-button" onClick={() => setShowGreeting(true)}>Show Greeting</button>  
   </div>
 );  
};
```

```jsx
describe('<Greeting />', () => {  
  it('shows correct greeting', () => {  
    const screen = render(<Greeting />);  
     const greeting = screen.getByTestId('greeting');  
     const button = screen.getByTestId('show-greeting-button');  

     expect(greeting.textContent).toBe('');  
     fireEvent.click(button);  
     expect(greeting.textContent).toBe('Hello human!');  
 });  
});
```
- `data-testid` 를 사용했는데 이러면 테스트 DOM 접근이 수월하다. 

## E2E(End-to-End) testing
- Level: High
- Scope: 실제 브라우저에서 사용자가 하는 행동과 그 결과를 테스트한다.
- Possible tools: Cypress, puppeteer

```js
describe('Greetings functionality', () => {  
  it('should navigate to greetings page and confirm it works', () => {
    cy.visit('http://localhost:3000')  
    cy.get('#greeting-nav-button').click()  
    cy.get('#greetings-input').type('Evgeny', { delay: 400 })  
    cy.get('#greetings-show-button').click()  
    cy.get('#greeting-text').should('include.text', 'Hello Evgeny!')  
  })  
})
```

매번 똑같은 테스트를 일일이 클릭해서 하는 것보다 기계가 하는게 훨씬 빠르니, QA말고 기계가 테스트를 해준다고 생각하면 된다.

그렇지만 딱 이런 결과가 나올 것이다.

![25a88e62060a574cdba287dfbaf10b74](https://user-images.githubusercontent.com/12723983/147301868-69072681-ee4a-4dde-b234-0aa78a53052c.gif)

> 사용자들은 개발자들이 해달라는대로 움직여주지 않는다.

사용자들이 접근 하는 방법이 너무 다르다. 왜 QA 팀이 있는건지 생각해보면 된다. 
 
처음부터 모든 방법을 테스트 해보려고 했더니 오랜 시간을 들인거에 비해서 새로운 이슈는 계속 발생했다.  
그러니 초반엔 기획에서 명시한 방법에 대해서만 처리하고, 
QA에 나오면 그때 추가적으로 테스트 코드를 작성하자.

## Visual regression testing
Level: High
Scope: 코드가 변경됐을 때 화면 구조가 변화하는지, 가상 구조를 테스트하는 방법.
Possible tools: Cypress, Percy, Applitools

E2E 테스트에서는 화면의 디자인(구조)이 바꼈는지 파악하기 어렵다. 그래서 가상 화면을 만들어두고 이벤트가 발생했을 때 높이나 가로 디자인 등 화면이 변화하는지 체크하는 방법이다.
```js
describe('Greetings functionality', () => {  
  it('should navigate to greetings page and confirm everything is there', () => {  
    cy.visit('http://localhost:3000')  
    cy.get('#greeting-nav-button').click()  
    cy.get('#greetings-input').type('Evgeny', { delay: 400 })  
    cy.get('#greetings-show-button').click()  
    cy.get('#greeting-text').should('include.text', 'Hello Evgeny!')  


    // Percy test
     cy.percySnapshot() // HIGHLIGHT
  })  
})
```
`cy.percySnapshot()` 이 부분이 화면 비교를 하는 부분이다.

## Accessibility testing
- Level: High
- Scope: 웹사이트, 도구, 기술 등을 잘 이용하지 못하는 사람들을 위해 만들어진 기준을 잘 지키고 있는지 테스트하는 방법
- Possible tools: AccessLint, axe-core, Lighthouse, pally

눈이 안좋으신 분들은 스크린 리더기라는 기계를 이용해서 웹사이트의 정보를 읽어오는데 모든 화면이 이미지로만 이루어져 있을 경우(상세설명 없이)
어떤 컨텐츠를 사용하고 있는지 기계가 읽어주지 않는다. 이런 보조 기계들을 사용할 때 컨텐츠를 잘 읽어오는지를 테스트해야한다.

크롬의 Lighthouse 를 가장 많이 들어봤다. 

## Performance testing
- Level: High
- Scope: 성능과 안정성 테스트
- Possible tools: Lighthouse, PageSpeed Insights, WebPageTest, WSlow

## Todo
- dev tool 에 있는 Lighthouse 를 testing suite 에 넣을 수도 있다고 한다.<br/>
https://css-tricks.com/continuous-performance-analysis-with-lighthouse-ci-and-github-actions/
