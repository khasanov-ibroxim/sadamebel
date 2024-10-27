import React, { useState } from 'react';
import modern1 from "../assets/mebel/m2.jpg"
import modern2 from "../assets/mebel/m3.jpg"
import modern3 from "../assets/mebel/m4.jpg"
import modern4 from "../assets/mebel/m5.jpg"
import modern5 from "../assets/mebel/m6.jpg"
const Questions = () => {
    // Sample questions data with images for each option
    const questions = [
        {
            id: 1,
            text: 'Выберите форму кухни',
            options: [
                { label: 'Прямая', img: modern1 },
                { label: 'С островом', img: modern2 },
                { label: 'Угловая', img: modern3 },
                { label: 'П-образная', img: modern4 },
                { label: 'Полуостровная', img: modern5 },
            ],
        },
        // Add more questions here if needed
    ];

    // State to hold the selected answers
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Handle option selection
    const handleOptionSelect = (option) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questions[currentQuestionIndex].id]: option.label,
        }));
    };

    // Go to the next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('All questions answered');
            // Here, you could send `answers` to the server or process it further
        }
    };

    return (
        <div className="questions">
            <span className="app-opacity"></span>
            <h2>{questions[currentQuestionIndex].text}</h2>
            <div style={{display: 'flex', justifyContent: 'center', gap: '0px', flexWrap: 'wrap'}}>
                {questions[currentQuestionIndex].options.map((option) => (
                    <div
                        key={option.label}
                        onClick={() => handleOptionSelect(option)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            outline: 'none',
                            border: answers[questions[currentQuestionIndex].id] === option.label ? '2px solid #FFD700' : '2px solid transparent',
                            backgroundColor: answers[questions[currentQuestionIndex].id] === option.label ? '#FFF9C4' : '#FFF',
                        }}
                    >
                        <img src={option.img} alt={option.label}
                             style={{width: '150px', height: '100px', marginBottom: '10px'}}/>
                        <span>{option.label}</span>
                    </div>
                ))}
            </div>
            <button onClick={handleNextQuestion} className={"questions_btn"}>
                Далее
            </button>
        </div>
    );
};

export default Questions;
