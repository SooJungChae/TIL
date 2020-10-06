# react-intl 로 언어 localization 하기

formatjs 는 프로젝트가 React 이든 아니든 다중 언어 설정을 도와주는 라이브러리이다.

## 설치
```
npm i -S react-intl
```

## 사용법
다음을 만들어보자. (TODO: 테스트 필요)
```
ko 버전 : 안녕하세요 {name}
en 버전 : Hello {name}
```

1. 메세지를 선언한다.
    ```
    const messages = {
        ko: {
            GEETING: '안녕하세요 {name}'
        },
        en: {
            GEETING: 'Hello {name}'
        }
    }
    ```

2. 메세지를 불러온다.
    ```
    function loadLocaleData(locale: string) {
      return messages[locale];
    }
    
    const App = ({messages}) => (
      <div>
        <FormattedMessage
          value={messages.GREETING}
        />
      </div>
    )
    
    async function bootstrapApplication(locale, mainDiv) {
      const messages = await loadLocaleData(locale);
    
        ReactDOM.render(
          <IntlProvider locale={locale} messages={messages}>
            <App />
          </IntlProvider>,
          document.getElementById('container')
        )
    }
    ```

## 2. ...
1. 메세지를 선언한다. (* 현재는 en 버전이다. fr 버전도 작성한다고 가정한다.)
    ```
    import * as React from 'react'
    import {FormattedMessage, useIntl, injectIntl} from 'react-intl'
    
    class PasswordChangeWithIntl extends React.Component {
      render() {
        const {intl} = this.props
        return (
          <li>
            <input
              placeholder={intl.formatMessage({
                defaultMessage: 'New Password',
                description: 'placeholder text',
              })}
            />
            <input
              placeholder={intl.formatMessage({
                id: 'explicit-id',
                defaultMessage: 'Confirm Password',
                description: 'placeholder text',
              })}
            />
          </li>
        )
      }
    }
    
    const PasswordChange = injectIntl(PasswordChangeWithIntl)
    
    export function List(props) {
      const intl = useIntl()
      return (
        <section>
          <header>
            <FormattedMessage
              defaultMessage="Control Panel"
              description="title of control panel section"
            />
          </header>
          <ul>
            <li>
              <button>
                <FormattedMessage
                  defaultMessage="Delete user {name}"
                  description="Delete button"
                  values={{
                    name: props.name,
                  }}
                />
              </button>
            </li>
            <PasswordChange />
          </ul>
        </section>
      )
    }
    ```

2. 선언한 메세지를 추출한다.
    ```
    npm i -D @formatjs/cli
    ```
    
    `package.json`
    ```
    {
      "scripts": {
        "extract": "formatjs extract"
      }
    }
    ```

    추출
    ```
    npm run extract -- 'src/**/*.ts*' --out-file lang/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'
    npm run extract -- 'src/**/*.ts*' --out-file lang/fr.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'
    ```

    다음 파일들 생성된다.
    - id 가 정의되지 않았다면 자동으로 id 가 생성되는 걸 볼 수 있다.
    
    `lang/en.json`
    ```
    {
      "hak27d": {
        "defaultMessage": "Control Panel",
        "description": "title of control panel section"
      },
      "haqsd": {
        "defaultMessage": "Delete user {name}",
        "description": "delete button"
      },
      "19hjs": {
        "defaultMessage": "New Password",
        "description": "placeholder text"
      },
      "explicit-id": {
        "defaultMessage": "Confirm Password",
        "description": "placeholder text"
      }
    }
    ``` 
    
    `lang/fr.json`
    ```
    {
      "hak27d": {
        "defaultMessage": "Panneau de configuration",
        "description": "title of control panel section"
      },
      "haqsd": {
        "defaultMessage": "Supprimer l'utilisateur {name}",
        "description": "delete button"
      },
      "19hjs": {
        "defaultMessage": "nouveau mot de passe",
        "description": "placeholder text"
      },
      "explicit-id": {
        "defaultMessage": "Confirmez le mot de passe",
        "description": "placeholder text"
      }
    }
    ```

3. 컴파일 실행

    `package.json`
    ```
    {
      "scripts": {
        "compile": "formatjs compile"
      }
    }
    ```
    
    ```
    npm run compile -- lang/en.json --ast --out-file compiled-lang/en.json
    npm run compile -- lang/fr.json --ast --out-file compiled-lang/fr.json
    ```

4. 다음처럼 사용한다.
    ```
    import * as React from 'react'
    import * as ReactDOM from 'react-dom'
    import {IntlProvider} from 'react-intl'
    
    function loadLocaleData(locale: string) {
      switch (locale) {
        case 'fr':
          return import('compiled-lang/fr.json')
        default:
          return import('compiled-lang/en.json')
      }
    }
    
    function App(props) {
      return (
        <IntlProvider
          locale={props.locale}
          defaultLocale="en"
          messages={props.messages}
          // provider 에 local, messages 를 선언하면 하위 <Formatted*> 컴포넌트에서도 사용할 수 있다.
        >
          <MainApp />
        </IntlProvider>
      )
    }
    
    async function bootstrapApplication(locale, mainDiv) {
      const messages = await loadLocaleData(locale)
      ReactDOM.render(<App locale={locale} messages={messages} />, mainDiv)
    }
    ```

## FormatMessage
사용법은 2가지.
1. intl.formatMessage

    ```
    intl.formatMessage(
      {
        description: 'A message', // Description should be a string literal
        defaultMessage: 'My name is {name}', // Message should be a string literal
      },
      {
        name: userName,
      } // Values should be an object literal, but not necessarily every value inside
    )
    ```

2. `<FormattedMessage/>`
    - npm 으로 패키지를 다운 받으면 리액트 컴포넌트로 사용할 수 있다.
    
    ```
    import {FormattedMessage} from 'react-intl';
    
    <FormattedMessage
        description="A message" // Description should be a string literal
        defaultMessage="My name is {name}" // Message should be a string literal
        values={
            {
                name: userName,
            } // Values should be an object literal, but not necessarily every value inside
        }
    />
    ```

## FormatDate
data 를 만들기 위해선 React component 를 사용하거나 API 를 사용하는 방법이 있다. 
(React component 가 훨씬 유용하다. sideEffect 나 title / aria attribute 에 사용되는 경우 제외하곤 React component 를 사용하자.)

React Intl 을 사용하는 모든 앱은 `<IntlProvider>` component 를 사용해야 한다. 가장 일반적인 방법은 리액트 컴포넌트를 `<IntlProvider>` 로 묶고, 
사용자의 언어를 설정하고, 이 언어로 해석된 strings/messages 를 설정하는 것이다.

```
const App = ({importantDate}) => (
  <div>
    <FormattedDate
      value={importantDate}
      year="numeric"
      month="long"
      day="numeric"
      weekday="long"
    />
  </div>
)

ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <App importantDate={new Date(1459913574887)} />
  </IntlProvider>,
  document.getElementById('container')
)
```

## 참고
- [react-intl 공식 문서](https://formatjs.io/docs/react-intl)
