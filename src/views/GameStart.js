import React from 'react';
import styled from 'styled-components';
import PlayerModal from '../components/PlayerModal';
import { connect } from 'react-redux';
import { 
  showNameForm,
  playerNameInput,
  hideNameForm
} from '../redux'

const GameStartCard = styled.main`
  background-color: var(--color-primary-light);
  min-height: 84.75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-light);
  `
const GameStartButton = styled.button`
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
const PlayerModalForm = styled.form`
  position:fixed;
  width: 50vw;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 1vw;
  border-radius: 10px;
  background-color: var(--color-primary-dark);
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-light);
`
const PlayerModalInput = styled.input`
  background-color: var(--color-primary-lighter);
  min-height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-dark);
  border-radius: 2vh;
`
const PlayerModalButton = styled.button`
  background-color: var(--color-primary-lighter);
  min-height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-dark);
  border-radius: 2vh;
`

function GameStart(props) {

  const captureKeyboardHits = (e) => {
    props.playerNameInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.hideNameForm()
    props.history.push('/question')
  }

    return (
      <GameStartCard>
        <p>
          Click below and type your name to start playing
        </p>
        <GameStartButton type="button" onClick={props.showNameForm}>
          Start Playing
        </GameStartButton>

        <PlayerModal show={props.nameFormDisplayed} >
          <PlayerModalForm onSubmit={handleSubmit}>
            <label>
              Name of the Player
              <br/>
              <PlayerModalInput
               type="text"
               name="playerName" 
               placeholder="John Doe"
               onChange={captureKeyboardHits}
               value={props.playerName}
              />
            </label>
            <br/>
            <PlayerModalButton type="submit">
              Submit and start playing!
            </PlayerModalButton>
          </PlayerModalForm>
        </PlayerModal>

      </GameStartCard>
    )
  }

// In this FUNCTION I express/import the globalState
function mapStateToProps(state) {
  // It returns an OBJECT where 
  // the keys are the name of the prop your comp wants to use
  // the values are the actual parts of the global state your comp wants
  return {
    questions: state.questions,
    nameFormDisplayed: state.nameFormDisplayed,
    playerName: state.playerName
  }
}

// And in this OBJECT I express which actions we want to dispatch to this comp
const mapDispatchToProps = {
  // Similar to what mapStateToProps() return, in this OBJECT
  // the keys are the name of the prop your comp wants to use
  // however, the values are going to the ACTIONS that we want to able to
  // dispatch to our reducer
  showNameForm: showNameForm,
  playerNameInput: playerNameInput,
  hideNameForm: hideNameForm
}

// Connect is a func that returns a func in which we want to pass this comp
export default connect(mapStateToProps, mapDispatchToProps)(GameStart);