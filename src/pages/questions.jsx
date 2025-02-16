import React, { useState } from 'react';
import { message } from 'antd';

import quest from "../assets/question.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import quiz1_item1 from "../assets/quiz/quiz1_xaytek.webp"
import quiz1_item2 from "../assets/quiz/quiz1_modern.webp"
import quiz1_item3 from "../assets/quiz/quiz1_klassika.webp"
import quiz1_item4 from "../assets/quiz/quiz1_minimalizm.webp"

import quiz2_item1 from "../assets/quiz/quiz2_primoy.webp"
import quiz2_item2 from "../assets/quiz/quiz2_ostrov.webp"
import quiz2_item3 from "../assets/quiz/quiz2_uglavoy.webp"
import quiz2_item4 from "../assets/quiz/quiz2_p.webp"
import quiz2_item5 from "../assets/quiz/quiz2_poluostrov.webp"

import quiz3_item1 from "../assets/quiz/quiz3_otkritya.webp"
import quiz3_item2 from "../assets/quiz/quiz3_podsvetka.webp"
import quiz3_item3 from "../assets/quiz/quiz3_sushilka.webp"
import quiz3_item4 from "../assets/quiz/quiz3_kargo.webp"

const Questions = () => {
    const questions = [
        {
            id: 1,
            text: 'В каком стиле вы хотите кухню?',
            options: [
                { label: 'Хай Тек‍', img: quiz1_item1 },
                { label: 'Модерн‍', img: quiz1_item2 },
                { label: 'Неоклассика', img: quiz1_item3 },
                { label: 'Классика', img: "https://kuhni-smart.ru/image/catalog/article/klasskm02.jpg" },
                { label: 'Не могу выбрать‍', img: quest },
            ],
        },
        {
            id: 2,
            text: 'Выберите форму кухни',
            options: [
                { label: 'Прямая‍', img: quiz2_item1 },
                { label: 'С островом', img: quiz2_item2 },
                { label: 'Угловая', img: quiz2_item3 },
                { label: 'П-образная', img: quiz2_item4 },
                { label: 'Полуостровная', img: quiz2_item5 },
            ],
        },
        {
            id: 3,
            text: 'Какая длина вашей кухни?',
            subText: "Введите приблизительную длину‍",
            options: [],
        },
        {
            id: 4,
            text: 'Какой материал вы предпочитаете использовать для фасадов? (можно выбрать несколько)',
            options: [
                { label: 'Шпон (подороже)' },
                { label: 'Акрил (подороже)' },
                // { label: 'МДФ в пленке (подешевле)' },
                // { label: 'Пластик (средняя стоимость)' },
                { label: 'ДСП (подешевле)' },
                { label: 'Крашенный МДФ‍' },
                { label: 'ЛМДФ (подешевле)' },
                { label: 'Не знаю‍' },
            ],
        },
        {
            id: 5,
            text: 'Какие элементы кухни вы предпочитаете? (можно выбрать несколько)',
            options: [
                { label: 'Плавное открытие фасадов‍', img: quiz3_item1 },
                { label: 'Подсветка‍', img: quiz3_item2 },
                { label: 'Сушилка‍', img: quiz3_item3 },
                { label: 'Карго‍', img: quiz3_item4 },
            ],
        },
        {
            id: 6,
            text: 'Из какого материалы вы предпочитаете столешницу? (можно выбрать несколько)',
            options: [
                { label: 'Искусственный камень‍' },
                { label: 'Тексталит' },
                { label: 'Кварц‍' }
            ],
        },
    ];

    const [messageApi, contextHolder] = message.useMessage();
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();


    const handleOptionSelect = (optionLabel) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questions[currentQuestionIndex].id]: optionLabel,
        }));
    };
    const handleInputChangeForQuestion3 = (e) => {
        const { value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questions[currentQuestionIndex].id]: value,
        }));
    };
    const handleMultipleOptionSelect = (optionLabel) => {
        setAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[questions[currentQuestionIndex].id] || [];
            if (currentAnswers.includes(optionLabel)) {
                return {
                    ...prevAnswers,
                    [questions[currentQuestionIndex].id]: currentAnswers.filter(label => label !== optionLabel),
                };
            }
            return {
                ...prevAnswers,
                [questions[currentQuestionIndex].id]: [...currentAnswers, optionLabel],
            };
        });
    };

    const handleNextQuestion = () => {
        if (!answers[questions[currentQuestionIndex].id]) {
            messageApi.error('Пожалуйста, выберите вариант ответа.');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizCompleted(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

        const hasNumber = /\d/;

        if (!formData.name || formData.name.trim().length === 0) {
            messageApi.open({
                type: 'error',
                content: 'Введите ваше имя',
            });
            setDisabled(false);
            return;
        }

        if (formData.name.trim().length <= 3 || hasNumber.test(formData.name)) {
            messageApi.open({
                type: 'error',
                content: "Введите ваше имя правильно",
            });
            setDisabled(false);
            return;
        }

        if (!formData.phone || formData.phone.trim().length < 17) {
            messageApi.open({
                type: 'error',
                content: "Введите ваш номер телефона правильно",
            });
            setDisabled(false);
            return;
        }

        // Savollar va javoblarni tayyorlash
        const responses = questions.map((question) => {
            return {
                question: question.text,
                answer: answers[question.id] || 'Javob berilmadi',
            };
        });

        let msg = `<b>Yangi xabar </b>\n`;
        msg += `\nIsmi: ${formData.name}\n`;
        msg += `\nTel: ${formData.phone}\n`;
        responses.forEach((resp) => {
            msg += `\nSavol: ${resp.question}\n`;
            msg += `Javob: ${resp.answer}\n`;
        });

        const TOKEN = "8162887690:AAG-rSREL66depoFw08bxBByoxMxKrTcKu8";
        const CHAT_ID = "-1002485742935";

        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: msg
        }).then((res) => {
            if (res?.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Сообщение успешно отправлено',
                });
                // Formni tozalash
                setTimeout(() => navigate("/"), 3000);
            }
        }).catch((e) => {
            messageApi.open({
                type: 'error',
                content: 'Произошла ошибка на сервере',
            });
            setDisabled(false);
        });
    };
    console.log(answers)
    return (
        <div className="questions">
            <span className="app-opacity"></span>
            {contextHolder}
            {!isQuizCompleted ? (
                <>
                    <h2>{questions[currentQuestionIndex].text}</h2>
                    {questions[currentQuestionIndex].subText &&
                        <p className={"questions_subtext"}>{questions[currentQuestionIndex].subText}</p>}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0px',
                        flexWrap: 'wrap',
                        textAlign: "center"
                    }}>
                        {questions[currentQuestionIndex].id === 3 ? (
                            <input
                                type="text"
                                placeholder="Введите длину"
                                value={answers[3] || ''}
                                onChange={handleInputChangeForQuestion3}
                                className="questions_input"
                            />
                        ) : questions[currentQuestionIndex].id === 4 || questions[currentQuestionIndex].id === 6 ? (
                            <div className="questions_check">
                                {questions[currentQuestionIndex].options.map((option) => (
                                    <label key={option.label}>
                                    <input
                                            type="checkbox"
                                            checked={(answers[questions[currentQuestionIndex].id] || []).includes(option.label)}
                                            onChange={() => handleMultipleOptionSelect(option.label)}
                                        />
                                        <span className="checkmark"></span>
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        ) : questions[currentQuestionIndex].id === 5 ? (
                                questions[currentQuestionIndex].options.map((option) => {
                                    const isSelected = (answers[questions[currentQuestionIndex].id] || []).includes(option.label);
                                    return (
                                        <div
                                            key={option.label}
                                            onClick={() => handleMultipleOptionSelect(option.label)}
                                            style={{
                                                border: isSelected ? '2px solid #FFD700' : '2px solid transparent',
                                                backgroundColor: isSelected ? '#FFF9C4' : '#FFF',
                                            }}
                                            className="answer"
                                        >
                                            <img
                                                src={option.img}
                                                alt={option.label}
                                                style={{width: '150px', height: '100px', marginBottom: '10px'}}
                                                loading="lazy"
                                            />
                                            <span>{option.label}</span>
                                        </div>
                                    );
                                })
                            ) :
                            (
                                questions[currentQuestionIndex].options.map((option) => (
                                    <div
                                        key={option.label}
                                        onClick={() => handleOptionSelect(option.label)}
                                        style={{
                                            border: answers[questions[currentQuestionIndex].id] === option.label
                                                ? '2px solid #FFD700'
                                                : '2px solid transparent',
                                            backgroundColor: answers[questions[currentQuestionIndex].id] === option.label
                                                ? '#FFF9C4'
                                                : '#FFF',
                                        }}
                                        className="answer"
                                    >
                                        <img
                                            src={option.img}
                                            alt={option.label}
                                            style={{width: '150px', height: '100px', marginBottom: '10px'}}
                                            loading="lazy"
                                        />
                                        <span>{option.label}</span>
                                    </div>
                                ))
                            )
                        }
                    </div>

                    <div className="questions_btn_box">
                        {currentQuestionIndex > 0 && (
                            <button onClick={handlePreviousQuestion} className="questions_btn">
                                Назад
                            </button>
                        )}
                        <button onClick={handleNextQuestion} className="questions_btn">
                            Далее
                        </button>
                    </div>
                </>
            ) : (
                <div className="form-container">
                    <h2>Спасибо! </h2>
                    <p>Оставьте свое имя и номер телефона. Мы рассчитаем стоимость кухни и свяжемся с вами.</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Имя:</span>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
                        </label>
                        <label>
                            <span>Телефон:</span>
                            <input type="tel" placeholder={"+998"} name="phone" value={formData.phone}
                                   onChange={e => {
                                       const formattedValue = e.target.value.replace(/\D/g, '');
                                       let formattedNumber = '+998';
                                       if (formattedValue.length > 3) {
                                           formattedNumber += ' ' + formattedValue.substring(3, 5);
                                       }
                                       if (formattedValue.length > 5) {
                                           formattedNumber += ' ' + formattedValue.substring(5, 8);
                                       }
                                       if (formattedValue.length > 8) {
                                           formattedNumber += ' ' + formattedValue.substring(8, 10);
                                       }
                                       if (formattedValue.length > 10) {
                                           formattedNumber += ' ' + formattedValue.substring(10, 12);
                                       }
                                       setFormData({...formData, phone: formattedNumber});
                                   }}
                                   required/>
                        </label>

                        <button type="submit">Отправить</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Questions;
