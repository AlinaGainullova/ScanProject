import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import pic1 from "./pic1.svg";
import styles from "./MainPage.module.scss"
import pic2 from "./pic2.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import TariffCards from "../../components/TariffCards/TariffCards";


export default function MainPage() {
    const isAuth = useSelector(state => state.account.isAuth);
    const currentTariff = useSelector(state => state.account.tariff);

    return (
        <>
            <Header />
            <main className={styles.mainpage}>
            <section className={styles.mainpage__first_block}>   
            <div className={styles.mainpage__text_and_button}>
                <h1 className={styles.text_and_button__h1}> Сервис по поиску<br />
                     публикаций<br />
                     о компании<br />
                     по его ИНН</h1>
                <p className={styles.text_and_button__text}> Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                <button className={isAuth ? styles.text_and_button__button : styles.text_and_button__notButton}>
                {isAuth &&<Link to="/search"><span>Запросить данные</span></Link>}</button>
            </div>
            <div>
                <img className={styles.pic1} src={pic1} alt="picture1"></img>
            </div>
            </section>
            <section className={styles.mainpage__carousel}>
            <h2 className={styles.carousel__h2}>Почему именно мы</h2>
            <Carousel />
            <img src={pic2} alt="picture2"></img>
            </section>
            <section className={styles.tariffs}>
            <h2 className={styles.tariff__h2}>наши тарифы</h2>
            <TariffCards current={isAuth && currentTariff === 1}/>
            </section>
            </main>
            <Footer />
        </>
    );
}