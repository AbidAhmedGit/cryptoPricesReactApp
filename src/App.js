import './App.css';
import React, { useState, useEffect } from 'react';

const QUIZ_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/quiz';

export default function Quiz() {
  //questions = [{…}, {…}, {…}]
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // current answer index is the same as current question index
  // Need a current answer and set current answer useState
  const [currentAnswer, setCurrentAnswer] = useState(null);

  // track which answer was chosen
  const [chosenAnswers, setChosenAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(QUIZ_API_BASE_URL);
        // console.log('++++++++++++++++response', response)
        const data = await response.json();
        console.log('++++++++++++++++response.json(data)', data)
        setQuestions(data);

      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  //questions = [{answers(arr), correctAnswer(integer), question(str)}, {…}, {…}]
  if (questions === null) {
    return null; // Display a loading state until data is fetched
  }

  // function to handle choosing an answer
  // you need the question index and answer index to determine which option is chosen
  // clone the chosen answer and update it in newChosenAnswer
  function updateChosenAnswer(questionIndex, answerIndex) {
    const newChosenAnswers = [...chosenAnswers];
    newChosenAnswers[questionIndex] = answerIndex;
    setChosenAnswers(newChosenAnswers);
  }

  // currentQuestion = {answers, correctAnswer, question}
  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length -1;

  return (
    <>
      <h1>{currentQuestion.question}</h1>

      {/* answers= [useState, useEffect, useFetch, useTimeout] */}
      {currentQuestion.answers.map((answer, answerIndex) => {
        // set current answer index to currentQuestionIndex
        // setCurrentAnswer(answer)

        const chosenAnswer = chosenAnswers[currentQuestionIndex]
        let class_name = 'answer'

        // check if this particular answer(newChosenAnswer) is the correct answer
        // if it is correct attach 'correct' to the className
        // if not attach incorrect to the className
        if (chosenAnswer === answerIndex) {
          class_name += answerIndex === currentQuestion.correctAnswer ? ' correct' : ' incorrect';
        }
        

        return (
          <>
          <h2
            key={answer}
            className = {class_name}
            onClick={() => {
              if (chosenAnswer != null) return;
              updateChosenAnswer(currentQuestionIndex, answerIndex)
            }}
          >
            {answer}
          </h2>
          </>
        )
      })}
      <button
        disabled = {isFirstQuestion}
        onClick={()=>{
          setCurrentQuestionIndex(currentQuestionIndex -1)
        }}
      >Back</button>
      <button
        disabled = {isLastQuestion || chosenAnswers[currentQuestionIndex] == null}
        onClick={()=>{
          setCurrentQuestionIndex(currentQuestionIndex +1)
        }}
      >Next</button>

    </>
  );
}
