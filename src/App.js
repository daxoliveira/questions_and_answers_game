import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import GameStart from './views/GameStart';
import PlayerModal from './components/PlayerModal';
import Question from './views/Question';
import CorrectAnswerModal from './components/CorrectAnswerModal';
import WrongAnswerModal from './components/WrongAnswerModal';
import GameEnd from './views/GameEnd';

import { Provider } from 'react-redux';


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
function App() {
  return (
    <Provider>

      <AppCard>
        <AppCardHeader>
          <h1>Questions And Answers Game</h1>
        </AppCardHeader>

        <BrowserRouter>
            <Route path="/" exact component={GameStart} />
            <Route path="/playermodal" component={PlayerModal} />
            <Route path="/question" component={Question} />
            <Route path="/wronganswer" component={WrongAnswerModal} />
            <Route path="/correctanswer" component={CorrectAnswerModal} />
            <Route path="/gameend" component={GameEnd} />
        </BrowserRouter>
      </AppCard>
      
    </Provider>
  );
}

export default App;
