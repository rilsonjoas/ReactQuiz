import imgLogo from '../assets/quiz-logo.png'

export default function Header (){
    return <header>
        <img src={imgLogo} alt="Logomarca"/>
        <h1>ReactQuiz</h1>
    </header>
}