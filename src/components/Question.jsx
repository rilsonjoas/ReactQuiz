import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";

import questions from "../questions.js";

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  // Define o tempo limite inicial
  let timer = 10000;

  // Se uma resposta foi selecionada, define o tempo limite para 1 segundo
  if (answer.selectedAnswer !== "") {
    timer = 1000;
  }

  // Se a corretude da resposta foi verificada, define o tempo limite para 2 segundos
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(selectedAnswer) {
    // Define a resposta selecionada e redefine isCorrect
    setAnswer({
      selectedAnswer: selectedAnswer,
      isCorrect: null,
    });

    // Após 1 segundo, verifica se a resposta está correta
    setTimeout(() => {
      setAnswer({
        selectedAnswer: selectedAnswer, // Mantém a resposta selecionada
        isCorrect: questions[questionIndex].answers[0] === selectedAnswer,
      });

      // Após 2 segundos (tempo total de 3 segundos), passa a resposta para o componente pai
      setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, 2000);
    }, 1000);
  }

  // Determina o estado da resposta para aplicar classes CSS
  let answerState = "";
  if (answer.selectedAnswer !== "" && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer !== "") {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer} // A chave é atualizada quando o timer muda, reiniciando o componente
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{questions[questionIndex].text}</h2>
      <Answers
        answers={questions[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
