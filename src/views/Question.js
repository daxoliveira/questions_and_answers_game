import React from 'react';
import styled from 'styled-components';
import CorrectAnswerModal from '../components/CorrectAnswerModal';
// import WrongAnswerModal from '../components/WrongAnswerModal';
import { connect } from 'react-redux';
// We need to import every action creator function we want to send to the reducer here
import { shuffleQuestions, correctAnswer } from '../redux'

const QuestionCard = styled.div`
  position:fixed;
  width: 50vw;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 1vw;
  margin: 2vw;
  border-radius: 10px;
  background-color: var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-light);
`
const QuestionCardHeader = styled.div`
  background-color: var(--color-secondary);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-dark);
`
const QuestionCardBody = styled.div`
  background-color: var(--color-secondary);
  width: 100%;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-dark);
  border-radius: 2vh;
`
const AnswersForm = styled.form`
  padding: 2vh;
`
const SingleAnswer = styled.button`
  background-color: var(--color-primary-dark);
  color: var(--font-color-primary-light);
  width: 48vw;
  font-size: calc(10px + 2vmin);
  display: flex;
  justify-content: left;
  align-items: center;
`
const CorrectAnswerModalButton = styled.button`
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
// const WrongAnswerModalButton = styled.button`
//   background-color: var(--color-primary-lighter);
//   min-height: 8vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: var(--font-color-primary-dark);
//   border-radius: 2vh;
//   `

function Question(props) {
  // Extraction of pieces of state questions and index
  const questions = props.questions
  const index = props.index

  // Extraction of the obj answer from the 
  const alternatives = Object.keys(questions[index].answer)



  // Method to compare the value of the alternative clicked to its boolean key value
  const checkAlternative = (event) => {
    // Built-in method to prevent triggering of reload
    event.preventDefault()

    // Extraction of obj's key value returned from the event
    const { value } = event.target

    // Searched through answer obj keys using bracket key searching
    // The searchable string comes from the value of the event
    // Depending on the found key's value a different modal will display
    questions[index].answer[value]

        // If true, display Correct Answer Modal
      ? props.correctAnswer()

        // If false, display Wrong Answer Modal
      : console.log("errou")
  }

  
  return (
    <QuestionCard>
      <QuestionCardHeader>
        <p>
          {
            // Display only the current question obj from the questions arr
            questions[index].question
          }
        </p>
      </QuestionCardHeader>

      <QuestionCardBody>
        <AnswersForm>
          {
            // Display of each possible answer in btn format from alternatives array
            alternatives.map((answer) => {
              return(
                <SingleAnswer onClick={(event) => {checkAlternative(event)}} value={answer}>
                  {answer}
                </SingleAnswer>
              )
            })
          }
        </AnswersForm>
      </QuestionCardBody>

      <CorrectAnswerModal show={props.show}>
        <h2>
          Congrats, you've got the correct answer!
        </h2>
        <CorrectAnswerModalButton type="submit">
          Next Question
        </CorrectAnswerModalButton>
      </CorrectAnswerModal>

       {/* <WrongAnswerModal show={this.state.incorrect} handleClose={this.hideIncorrect}>
          <h2>
            Sorry, you didn't get it right this time!
          </h2>
         <WrongAnswerModalButton type="submit" onClick={this.quit}>
           Quit Playing
         </WrongAnswerModalButton>
         <WrongAnswerModalButton type="submit" onClick={this.restart}>
           Restart the Game
         </WrongAnswerModalButton>
       </WrongAnswerModal> */}

    </QuestionCard>
  )
}

// In this FUNCTION I express/import the globalState
function mapStateToProps(state) {
  // It returns an OBJECT where 
  // the keys are the name of the prop your comp wants to use
  // the values are the actual parts of the global state your comp wants
  return {
    questions: state.questions,
    index: state.index,
    show: state.show
  }
}

// And in this OBJECT I express which actions we want to dispatch to this comp
const mapDispatchToProps = {
  // Similar to what mapStateToProps() return, in this OBJECT
  // the keys are the name of the prop your comp wants to use
  // however, the values are going to the ACTIONS that we want to able to
  // dispatch to our reducer
  shuffleQuestions: shuffleQuestions,
  correctAnswer: correctAnswer
}

// Connect is a func that returns a func in which we want to pass this comp
export default connect(mapStateToProps, mapDispatchToProps)(Question);