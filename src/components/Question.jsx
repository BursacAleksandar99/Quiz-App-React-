import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
export default function Question({
    questionText, 
    answers, 
    onSelectedAnswer, 
    selectedAnswer, 
    answerState,
    onSkipAnswer}){
    return(
        <div id="question">
            <QuestionTimer 
                // key={activeQuestionIndex} deleting key from here, putting it in Quiz.jsx commponent!
                timeout={10000} 
                onTimeout={onSkipAnswer}/>
                <h2>{questionText}</h2>
                <Answers 
                // key={activeQuestionIndex}
                answers={answers} 
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelectedAnswer}/>

        </div>
    )
}