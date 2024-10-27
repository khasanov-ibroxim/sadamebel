import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import logo from '../assets/logo.png'
import {mebelData} from "../assets/mebel/mebelData.jsx";
const Index = () => {
    const navigate = useNavigate();

    return (
        <div className="App">
            <span className="app-opacity"></span>

            <div className="app_content_box">
                <div className="app_content_box_text">
                    <img src={logo} alt="Kitchen illustration"/>
                    <h1>Узнайте стоимость вашей кухни ответив на 6 простых вопросов</h1>
                    <p>Всего за 14 рабочих дней мы реализуем вашу кухню мечты, а чтобы ваша кухня стала еще уютнее, подарим сушилку и карго.</p>
                    <button onClick={() => navigate('/quiz')}>Рассчитать стоимость</button>
                    <h4>Г. Ташкент</h4>
                </div>
                <div className="app_box_images">
                    <Swiper
                        spaceBetween={30}
                        effect="fade"
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        modules={[EffectFade, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {mebelData.map((item, index) => (
                            <SwiperSlide key={index} >
                                <img src={item.url} alt={item.alt} loading={"lazy"}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Index;
