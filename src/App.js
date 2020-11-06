import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import GameStart from './views/GameStart';
import PlayerModal from './components/PlayerModal';
import Question from './views/Question';
import GameEnd from './views/GameEnd';

import { connect } from 'react-redux';
import { increment, decrement} from './redux/index'

const AppCard = styled.div`
  text-align: center;
  background-color: var(--color-primary-light);
`
const AppCardHeader = styled.header`
  background-color: var(--color-primary-dark);
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-light);
`

function App(props) {
  return (
      <AppCard>
        <AppCardHeader>
          <h1>Questions And Answers Game</h1>
        </AppCardHeader>

        <div>
        <h1>This is the count {props.count}</h1>
        <button onClick={props.apples}>-</button>
        <button onClick={props.oranges}>+</button>
      </div>

        <BrowserRouter>
            <Route path="/" exact component={GameStart} />
            <Route path="/playermodal" component={PlayerModal} />
            <Route path="/question" component={Question} />
            <Route path="/gameend" component={GameEnd} />
        </BrowserRouter>
      </AppCard>
  );
}

function mapStateToProps(globalState) {
  return {
    count: globalState
  }
}

const mapDispatchToProps = {
  oranges: increment,
  apples: decrement
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;