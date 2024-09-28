import { useRef } from "react";

export default function Answers ({answers, selectedAnswer, answerState, onSelect}) {
  const shuffedAnswers = useRef(); // Usa useRef para armazenar as respostas embaralhadas. Isso evita reembaralhar em cada renderização.
  // Embaralha as respostas apenas na primeira vez (evita reembaralhar em cada renderização).
  if (!shuffedAnswers.current) {
    shuffedAnswers.current = [...answers]; // Copia o array de respostas da pergunta ativa.
    shuffedAnswers.current.sort(() => Math.random() - 0.5); // Embaralha as respostas de forma aleatória.
  }

  return (
    <ul id="answers">
      {shuffedAnswers.current.map((answer) => {
        // Mapeia as respostas embaralhadas para exibi-las.
        const isSelected = selectedAnswer === answer; // Verifica se essa resposta é a última selecionada pelo usuário.
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected"; // Se a resposta foi dada e essa foi a escolhida, aplica a classe "selected".
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState; // Aplica as classes "correct" ou "wrong" se a resposta for correta ou errada, respectivamente.
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)} // Define a resposta selecionada ao clicar no botão.
              className={cssClass} // Aplica a classe CSS correta com base no estado.
              disabled={answerState !== ""}
            >
              {answer} {/* Exibe o texto da resposta */}
            </button>
          </li>
        );
      })}
    </ul>
  );
}