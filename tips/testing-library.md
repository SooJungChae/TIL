# testing-library

자주 사용하는 방법 모음

## `rendere.create`

TODO: 둘 중 어느방법을 쓰는게 좋을까?

- `import renderer from 'react-test-renderer';`
- `import { render, screen } from '@testing-library/react';`

```tsx
import renderer from 'react-test-renderer';

it('init', () => {
  const calendar = renderer.create(<Calendar startDate={moment().toDate()} />);
  expect(calendar).toMatchSnapshot();
});
```

## `getAllByRole`

원하는 tag 를 찾을 수 있다.

```tsx
import { render } from '@testing-library/react';

it('render startDate input when startDate is passed', () => {
  render(<Calendar startDate={today} />);

  expect(screen.getAllByRole('textbox').length).toBe(1);
});
```
 
## `data-testid`

html 태그에 data-testid 를 넣어놓으면 빠르게 찾을 수 있다.
```tsx
import { render, screen } from '@testing-library/react';

it('render startDate, endDate input when startDate, endDate is passed', () => {
  render(<Calendar startDate={today} endDate={today} isPeriod={true} />);

  expect(screen.getAllByRole('textbox').length).toBe(2);
  expect(screen.getByTestId('startDate')).toBeTruthy();
  expect(screen.getByTestId('endDate')).toBeTruthy();
});
```

## `userEvent`

- `@testing-library/react` 의 fireEvent 는 작동 안했지만 
- `@testing-library/user-event` 는 작동함

```tsx
it('show calendar when click', async () => {
    render(<Calendar startDate={today} />);
    expect(screen.getByTestId('startDate')).toBeTruthy();
    
    userEvent.click(screen.getByTestId('startDate'));
    
    expect(screen.getByText(today.getDate())).toBeTruthy();
});
```

## `class` 찾기

- classList 에서 해당 클래스 존재하는지 찾을 수 있음

```tsx
it('disabled after when maxStartDate is passed', async () => {
  const { debug } = render(<Calendar startDate={today} maxStartDate={today} />);
  expect(screen.getByTestId('startDate')).toBeTruthy();

  userEvent.click(screen.getByTestId('startDate'));

  const tomorrow = moment(today).add(1, 'day').toDate();

  expect(screen.getByText(today.getDate()).classList).toContain('active');
  expect(screen.getByText(tomorrow.getDate()).classList).toContain('disb');
});

```


