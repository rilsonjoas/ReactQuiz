import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout); // Inicializa o tempo restante com o valor do timeout passado como prop.

  // Este useEffect é responsável por chamar a função onTimeout quando o tempo total expirar.
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout); // Define um timeout que executa a função onTimeout após o tempo limite.
    return () => clearTimeout(timer); // Limpa o timeout quando o componente é desmontado ou timeout muda.
  }, [onTimeout, timeout]); // Reexecuta o efeito se onTimeout ou timeout mudar.

  // Este useEffect é responsável por atualizar o tempo restante a cada 100ms.
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100); // Atualiza o tempo restante, decrementando 100ms a cada intervalo.
    }, 100); // O intervalo de atualização é de 100ms.

    return () => {
      clearInterval(interval); // Limpa o intervalo quando o componente é desmontado ou o efeito é reexecutado.
    };
  }, []); // Executa o efeito apenas uma vez, ao montar o componente.

  return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />; // Renderiza um elemento progress indicando o tempo restante.
}
