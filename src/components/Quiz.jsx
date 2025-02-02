import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz(){

    // const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    
    
    const [userAnswers, setUserAnswers] = useState([]);


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
        
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer])

    if(quizIsComplete){
        return(
            <Summary userAnswers={userAnswers}/>
        )
    }
    
    

    return(
        <div id="quiz">
            <div id="question">
                <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectedAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}/>
                    
            </div>
            
        </div>
        
        
    )
}