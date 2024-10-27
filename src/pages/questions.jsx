import React, { useState } from 'react';
import { message } from 'antd';
import modern1 from "../assets/mebel/m2.jpg";
import modern2 from "../assets/mebel/m3.jpg";
import modern3 from "../assets/mebel/m4.jpg";
import modern4 from "../assets/mebel/m5.jpg";
import modern5 from "../assets/mebel/m6.jpg";
import quest from "../assets/question.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Questions = () => {
    const questions = [
        {
            id: 1,
            text: 'В каком стиле вы хотите кухню?',
            options: [
                { label: 'Хай Тек‍', img: modern1 },
                { label: 'Модерн‍', img: modern2 },
                { label: 'Классика‍', img: modern3 },
                { label: 'Минимализм‍', img: modern4 },
                { label: 'Не могу выбрать‍', img: quest },
            ],
        },
        {
            id: 2,
            text: 'Выберите форму кухни',
            options: [
                { label: 'Прямая‍', img: modern1 },
                { label: 'С островом', img: modern2 },
                { label: 'Угловая', img: modern3 },
                { label: 'П-образная', img: modern4 },
                { label: 'Полуостровная', img: modern5 },
            ],
        },
        {
            id: 3,
            text: 'Какая длина вашей кухни?',
            subText: "Выберите приблизительную длину‍",
            options: [
                { label: 'до 3-х метров' },
                { label: '3-5 метров‍' },
                { label: '5-7 метров‍' },
                { label: 'Более 7 метров‍' },
            ],
        },
        {
            id: 4,
            text: 'Какой материал вы предпочитаете использовать для фасадов? (можно выбрать несколько)',
            options: [
                { label: 'Шпон (подороже)' },
                { label: 'Акрил (подороже)' },
                { label: 'МДФ в пленке (подешевле)' },
                { label: 'Пластик (средняя стоимость)' },
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
                { label: 'Плавное открытие фасадов‍', img: modern1 },
                { label: 'Подсветка‍', img: modern2 },
                { label: 'Сушилка‍', img: modern3 },
                { label: 'Карго‍', img: modern4 },
            ],
        },
        {
            id: 6,
            text: 'Из какого материалы вы предпочитаете столешницу? (можно выбрать несколько)',
            options: [
                { label: 'Камень‍' },
                { label: 'Искусственный камень‍' },
                { label: 'МДФ‍' },
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

        if (!formData.phone || formData.phone.trim().length < 11) {
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

    return (
        <div className="questions">
            <span className="app-opacity"></span>
            {contextHolder}
            {!isQuizCompleted ? (
                <>
                    <h2>{questions[currentQuestionIndex].text}</h2>
                    {questions[currentQuestionIndex].subText && <p className={"questions_subtext"}>{questions[currentQuestionIndex].subText}</p>}

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0px', flexWrap: 'wrap', textAlign: "center" }}>
                        {questions[currentQuestionIndex].id === 3 ? (
                            <select className={"questions_select"} onChange={(e) => handleOptionSelect(e.target.value)} value={answers[3] || ''}>
                                <option value="">Выберите длину</option>
                                {questions[currentQuestionIndex].options.map((option) => (
                                    <option key={option.label} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : questions[currentQuestionIndex].id === 4  || questions[currentQuestionIndex].id === 6 ? (
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
                        ) :  questions[currentQuestionIndex].id === 5 ? (
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
                                                style={{ width: '150px', height: '100px', marginBottom: '10px' }}
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
                                            style={{ width: '150px', height: '100px', marginBottom: '10px' }}
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
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </label>
                        <label>
                            <span>Телефон:</span>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        </label>

                        <button type="submit">Отправить</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Questions;
