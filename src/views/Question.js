import React, { Component } from 'react';
import styled from 'styled-components';
import CorrectAnswerModal from '../components/CorrectAnswerModal';
import WrongAnswerModal from '../components/WrongAnswerModal';
import dbQuestions from '../db.json';

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
const QuestionCardInfo = styled.div`
  background-color: var(--color-primary-dark);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-secondary);
  border-radius: 2vh;
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
const SingleAnswer = styled.div`
  background-color: var(--color-primary-dark);
  color: var(--font-color-primary-light);
  width: 48vw;
  font-size: calc(10px + 2vmin);
  display: flex;
  justify-content: left;
`
const SubmitAnswerButton = styled.button`
  background-color: var(--color-primary-dark);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--font-color-primary-light);
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
const WrongAnswerModalButton = styled.button`
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


class Question extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      questions: [],
      show: false
    }
  }
  
  showModal = () => {
    this.setState({ show: true });
  };
  
  hideModal = () => {
    this.setState({ show: false });
  };
  
  shuffle = (arr) => {
    const shuffledArr = [];
    let index;
    while(shuffledArr.length < arr.length) {
      index = Math.floor(Math.random() * arr.length);
      if(!shuffledArr.includes(arr[index])) {
        shuffledArr.push(arr[index])
      } 
    }
    return shuffledArr
  }
  

  componentDidMount() {
    const gameStartQuestions = this.shuffle(dbQuestions)
    this.setState({questions: {...gameStartQuestions}})
  }
    
  render() {
    
    return (
      <QuestionCard>
        <QuestionCardInfo>
          <p>{localStorage.getItem('playerName') || 'Player'}</p>
        </QuestionCardInfo>
            <QuestionCardHeader>
              <p>
                  {this.state.questions[0] ? this.state.questions[0].question : null}
              </p>
            </QuestionCardHeader>
        <QuestionCardBody>
          <AnswersForm>
            <SingleAnswer>
              <label htmlFor="answer">
                <input type="radio" name="answer" value="answer"/>
                {this.state.questions[0] ? Object.keys(this.state.questions[0].answer) : null}
              </label>
            </SingleAnswer>
            <br/>
            <SubmitAnswerButton type="button" onClick={this.showModal}>
              Submit Answer
            </SubmitAnswerButton>
          </AnswersForm>
        </QuestionCardBody>

      <CorrectAnswerModal show={this.state.show} handleClose={this.hideModal}>
        <h2>
          Congrats, you've got the correct answer!
        </h2>
        <CorrectAnswerModalButton type="submit">
          Next Question
        </CorrectAnswerModalButton>
      </CorrectAnswerModal>

      <WrongAnswerModal show={this.state.show} handleClose={this.hideModal}>
          <h2>
            Sorry, you didn't get it right this time!
          </h2>
        <WrongAnswerModalButton type="submit">
          Quit Playing
        </WrongAnswerModalButton>
        <WrongAnswerModalButton type="submit">
          Restart the Game
        </WrongAnswerModalButton>
      </WrongAnswerModal>

    </QuestionCard>
    )
  }
}

export default Question;