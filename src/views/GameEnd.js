import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  resetGame
} from '../redux'

const GameEndCard = styled.main`
  background-color: var(--color-primary-light);
  min-height: 84.75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-light);
  `
const GameEndButton = styled.button`
  background-color: var(--color-secondary);
  min-height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-dark);
  border-radius: 2vh;
`

function GameEnd(props) {
  return (
    <GameEndCard>
      <p>
        Congratulations {props.playerName}, you've won this game and free smile!
      </p>
      <h1>
        :)
      </h1>
      <Link to="/">
        <GameEndButton type="button" onClick={props.resetGame}>
          Play Again!
        </GameEndButton>
      </Link>

    </GameEndCard>
  )
}

// In this FUNCTION I express/import the globalState
function mapStateToProps(state) {
  // It returns an OBJECT where 
  // the keys are the name of the prop your comp wants to use
  // the values are the actual parts of the global state your comp wants
  return {
    playerName: state.playerName
  }
}

// And in this OBJECT I express which actions we want to dispatch to this comp
const mapDispatchToProps = {
  // Similar to what mapStateToProps() return, in this OBJECT
  // the keys are the name of the prop your comp wants to use
  // however, the values are going to the ACTIONS that we want to able to
  // dispatch to our reducer
  restartGame: resetGame
}

// Connect is a func that returns a func in which we want to pass this comp
export default connect(mapStateToProps, mapDispatchToProps)(GameEnd);