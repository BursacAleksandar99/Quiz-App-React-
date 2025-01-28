import { useState, useCallback } from "react"
import QUESTIONS from '../questions.js'
import QuizCompleteImage from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz(){

    // const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const[userAnswers, setUserAnswers] = useState([]);
    


    const activeQuestionIndex = userAnswers.length;
    // console.log(userAnswers);
    
    // console.log(activeQuestionIndex);

    

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        
        setUserAnswers((prevUserAnswers) => {
            // console.log(prevUserAnswers);
            // console.log(selectedAnswer);
            
            
            return[...prevUserAnswers, selectedAnswer];
        });
        // console.log(selectedAnswer);
        
        
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer])

    if(quizIsComplete){
        return(
            <div id="summary">
                <img src={QuizCompleteImage} alt="Trophy icon"/>
                <h2>Quiz Completed!</h2>
            </div>
        )
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);

    return(
        <div id="quiz">
            <div id="question">
                <QuestionTimer 
                key={activeQuestionIndex}
                timeout={10000} 
                onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                    <ul id="answers">
                    {shuffledAnswers.map(answer =>(
                        <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
            </ul>
            </div>

        </div>
        
        
    )
}