import React from "react";
import lamp from "./lamp.svg";
import aim from "./aim.svg";
import laptop from "./aim.svg";
import check  from "./check.svg";
import styles from "./TariffCards.module.scss";

function TariffCards({current}){
    return(      
<div className={styles.cards}>

    <div className={styles.card_begginer}> 
        <div className={styles.card_head}>
            <div className={styles.card_head_txt}>
                <h2 className={styles.card_h2}>Beginner</h2>
                <p className={styles.card_text}>Для HR и фрилансеров</p>
            </div>    
            <img className={styles.card_svg} src={lamp} alt="lamp"></img>
        </div>
        <div className={styles.card_txt_field}>
        {current && <div className={styles.txt_field__current_tariff}>Текущий тариф</div>}
            <div className={styles.txt_field__container}>
                <div className={styles.txt_field__price}>
                    <div className={styles.price__new_price}>799 ₽</div>
                    <div className={styles.price__old_price}>1200 ₽</div>
                </div>
            <div className={styles.txt_field__description}>
                <p className={styles.description__p}>или 150 ₽/мес. при рассрочке на 24 мес.</p>
                <h3 className={styles.description__h3}>В тариф входит:</h3>
                <div className={styles.description__stroke_box}>
                    <img src={check} alt="check"></img>   
                    <p className={styles.description__p}>Безлимитная история запросов</p>
                </div>
                <div className={styles.description__stroke_box}>
                    <img src={check} alt="check"></img>   
                    <p className={styles.description__p}>Безопасная сделка</p>
                </div>
                <div className={styles.description__stroke_box}>
                    <img src={check} alt="check"></img>   
                    <p className={styles.description__p}>Поддержка 24/7</p>
                </div>
                {(current && <button className={styles.description__btn_lk}>Перейти в личный кабинет</button>)
                || <button className={styles.description__btn}>Подробнее</button>}
                </div>
            </div>
        </div>
    </div>

    <div className={styles.card_pro}> 
        <div className={styles.card_head}>
        <div className={styles.card_head_txt}>
            <h2 className={styles.card_h2}>Pro</h2>
            <p className={styles.card_text}>Для небольшого исследования</p>
        </div>    
            <img className={styles.card_svg} src={aim} alt="aim"></img>
        </div>
        <div className={styles.card_txt_field}>
            <div className={styles.txt_field__current_tariff}></div>
            <div className={styles.txt_field__container}>
            <div className={styles.txt_field__price}>
                <div className={styles.price__new_price}>1299 ₽</div>
                <div className={styles.price__old_price}>2600 ₽</div>
            </div>
            <div className={styles.txt_field__description}>
                <p className={styles.description__p}>или 279 ₽/мес. при рассрочке на 24 мес.</p>
                <h3 className={styles.description__h3}>В тариф входит:</h3>
                <div className={styles.description__stroke_box}>
                <img src={check} alt="check"></img>   
                <p className={styles.description__p}>Все пункты тарифа Beginner</p>
                </div>
                <div className={styles.description__stroke_box}>
                <img src={check} alt="check"></img>   
                <p className={styles.description__p}>Экспорт истории</p>
                </div>
                <div className={styles.description__stroke_box}>
                <img src={check} alt="check"></img>   
                <p className={styles.description__p}>Рекомендации по приоритетам</p>
                </div>
                <button className={styles.description__btn}>Подробнее</button>
            </div>
        </div>
        </div>
    </div>

    <div className={styles.card_bussines}> 
        <div className={styles.card_head}>
            <div className={styles.card_head_txt}>
                <h2 className={styles.card_h2}>Business</h2>
                <p className={styles.card_text}>Для корпоративных клиентов</p>
            </div>    
                <img className={styles.card_svg} src={laptop} alt="laptop"></img>
            </div>
        <div className={styles.card_txt_field}>
            <div className={styles.txt_field__current_tariff}></div>
                <div className={styles.txt_field__container}>
                <div className={styles.txt_field__price}>
                    <div className={styles.price__new_price}>2379 ₽</div>
                    <div className={styles.price__old_price}>3700 ₽</div>
                </div>
                <div className={styles.txt_field__description}>
                    <p className={styles.description__p}>или 495 ₽/мес. при рассрочке на 24 мес.</p>
                    <h3 className={styles.description__h3}>В тариф входит:</h3>
                    <div className={styles.description__stroke_box}>
                    <img src={check} alt="check"></img>   
                    <p className={styles.description__p}>Все пункты тарифа Pro</p>
                    </div>
                    <div className={styles.description__stroke_box}>
                    <img src={check} alt="check"></img>   
                    <p className={styles.description__p}>Безлимитное количество запросов</p>
                    </div>
                    <div className={styles.description__stroke_box}>
                    <img src={check} alt="check"></img>   
                    <p className={styles.description__p}>Приоритетная поддержка</p>
                    </div>
                    <button className={styles.description__btn}>Подробнее</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    );

}
export default TariffCards;

