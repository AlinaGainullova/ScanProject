import React , { Component } from "react";
import Slider from "react-slick";
import { ReactComponent as Watch } from "./watch.svg";
import { ReactComponent as Loop } from "./loop.svg";
import { ReactComponent as Shield } from "./shield.svg";
import rightArrow from "./icon_right.png";
import leftArrow from "./icons_left.png";
import styles from "./Carousel.module.scss";

const PrevArrow = ({ currentSlide, slideCount, ...props }) => 
<button {...props}>
    <img src = {leftArrow}  alt="arrowPrev" />
</button>;

const NextArrow = ({ currentSlide, slideCount, ...props }) =>
<button {...props}>
    <img src = {rightArrow}  alt="arrowNext"/>
</button>;

  export default class Carousel extends Component{
render(){

    const settings = {
        className: styles.slider,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    return (
        <Slider {...settings}>
                <div className={styles.slider__container}>
                    <Watch className={styles.slider__icon} />
                    <p className={styles.slider__text}>Высокая и оперативная скорость обработки заявки</p>
                </div>
                <div className={styles.slider__container}>
                    <Loop className={styles.slider__icon} />
                    <p className={styles.slider__text}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                </div>
                <div className={styles.slider__container}>
                    <Shield className={styles.slider__icon} />
                    <p className={styles.slider__text}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
                </div>
                <div className={styles.slider__container}>
                    <Watch className={styles.slider__icon} />
                    <p className={styles.slider__text}>Высокая и оперативная скорость обработки заявки</p>
                </div>
                <div className={styles.slider__container}>
                    <Loop className={styles.slider__svg} />
                    <p className={styles.slider__text}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                </div>     
                <div className={styles.slider__container}>
                <Shield className={styles.slider__icon} />
                <p className={styles.slider__text}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
                </div> 
        </Slider>
    );
}

}