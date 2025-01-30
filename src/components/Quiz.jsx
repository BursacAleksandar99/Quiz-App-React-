import { useState, useCallback } from "react"
import QUESTIONS from '../questions.js'
import QuizCompleteImage from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz(){

    // const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    
    const[userAnswers, setUserAnswers] = useState([]);
    const[answerState, setAnswerState] = useState('');
    


    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    // console.log(userAnswers);
    
    // console.log(activeQuestionIndex);

    

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){

        setAnswerState('aswered');        
        setUserAnswers((prevUserAnswers) => {
            // console.log(prevUserAnswers);
            // console.log(selectedAnswer);
            
            
            return[...prevUserAnswers, selectedAnswer];
        });
        // console.log(selectedAnswer);
        setTimeout(() =>{
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correnct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(() =>{
                setAnswerState('');
            },2000)
        }, 300)
        
        
    }, [activeQuestionIndex]);

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
    
    

    return(
        <div id="quiz">
            <div id="question">
                <Question 
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectedAnswer={handleSelectAnswer}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSkipAnswer={handleSkipAnswer}/>
                    
            </div>
            
        </div>
        
        
    )
}