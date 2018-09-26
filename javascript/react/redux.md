https://redux.js.org/basics/usagewithreact

## pure function & impure function
- pure function 은 바로 값을 return 해주는 것
- impure function 은 return 전에 db 호출, 다른 함수 호출 등 또 다른 작업을 수행하는 것
```javascript
// pure function
function sumXY(x, y) {
     return x + y;
}

// impure function
function sumXY(x) {
     y = getYDate();
     return x + y;
}
```

- redux 는 pure function
- 그래서 return 은 새로운 object 
- {이전 state, dispatch 되는 action} 을 받아서 다음 state 를 리턴하는 걸 reducer 라 한다.

## container component

- presentational component 를 추가해서 reducer 와 연결(connect)시키는 장소.
- connect() 하면 연결된 component 에 state 와 action 을 props 로 전달한다.
- = state 를 읽어오고, action 을 dispatch 할 수 있다.
- 다음은 Link presentational component 를 container component 에 연결하는 예제.

components/Link.js
```javascript
import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => (
  <button
  onClick={onClick}
  disabled={active}
  style={{
  marginLeft: '4px',
  }}
  >
  {children}
  </button>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
```

containers/VisibleTodoList.js
```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
```

- container 두 군데에서 Link 가 쓰이고 있다.

containers/FilterLink.js
```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
```
- mapDispatchToProps() : dispatch() 메소드를 받고, callback prop 를 리턴한다. 컴포넌트내에서는 this.props.onTodoClick 을 사용할 수 있다.
- onClick 하면 setVisibilityFilter(ownProps.filter) 액션을 보내라~
