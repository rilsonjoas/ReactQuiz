import { useState, useCallback } from "react";
import questions from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]); // Gerencia o estado das respostas do usuário.

  const activeQuestionIndex = userAnswers.length; // Seleciona a pergunta de acordo com o número de respostas. Se a resposta não foi dada, usa o comprimento das respostas, caso contrário, usa a última respondida.
  const quizIsComplete = activeQuestionIndex === questions.length; // Checa se o quiz foi completado (se todas as perguntas foram respondidas).

  // Função que é chamada quando uma resposta é selecionada
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer]; // Adiciona a resposta selecionada ao array de respostas do usuário.
      });
    },
    [] // Depende do índice da pergunta ativa para garantir que está verificando a pergunta correta.
  );

  // Função que pula a pergunta ao selecionar uma resposta nula
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer] // Usa a função handleSelectAnswer para pular a pergunta.
  );

  // Renderiza o componente de resumo quando o quiz está completo
  if (quizIsComplete) {
    return (
     <Summary userAnswers={userAnswers} />
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
