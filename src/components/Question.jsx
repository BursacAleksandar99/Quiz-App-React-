import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTION from '../questions.js';

export default function Question({
    index, 
    onSelectedAnswer,
    onSkipAnswer}){

        const [answer, setAnswer] = useState({
            selectedAnswer: '',
            isCorrect: null,
        })

        let timer = 10000;

        if(answer.selectedAnswer){
            timer = 1000;
        }

        if(answer.isCorrect !== null){
            timer = 2000;
        }

        function handleSelectAnswer(answer){
            setAnswer({
                selectedAnswer: answer,
                isCorrect: null,
            })

            setTimeout(() => {
                setAnswer({
                    selectedAnswer: answer,
                    isCorrect: QUESTION[index].answers[0] === answer,
                })

                setTimeout(() => {
                    onSelectedAnswer(answer);
                }, 2000)
            }, 1000)
        }

        let answerState = '';

        if(answer.selectedAnswer && answer.isCorrect !== null){
            answerState = answer.isCorrect ? "correct" : "wrong";
        }else if(answer.selectedAnswer){
            answerState = 'answered';
        }

    return(
        <div id="question">
            <QuestionTimer 
                // key={activeQuestionIndex} deleting key from here, putting it in Quiz.jsx commponent!
                key={timer}
                timeout={timer} 
                onTimeout={answer.selectedAnswer === "" ?  onSkipAnswer : null}
                mode={answerState}/>
                <h2>{QUESTION[index].text}</h2>
                <Answers 
                // key={activeQuestionIndex}
                answers={QUESTION[index].answers} // ovde je doslo do promene!
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}/>

        </div>
    )
}