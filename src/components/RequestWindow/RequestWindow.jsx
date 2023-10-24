import React, { useEffect, useRef, useState } from "react";
import styles from "./RequestWindow.module.scss";
import 'react-day-picker/dist/style.css';
import DateRangeInputs from "./DateRangeInputs/DateRangeInputs";
import { validateInn } from "./validatateInn";
import RequestToApi from "../../services/RequestToApi"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHistogram, setHistogramDate, setPublicationsList } from "../../storage/actions";

export default function RequestWindow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [innError, setInnError] = useState(false);
        const innInput = (event) => {
            if (event.target.value.length >= 10) {
                setInnError(!validateInn(event.target.value));
            } else {
                setInnError(false);
            }
            successfull();
        }

        const innInputBlur = (event) => {
            if (!innError)
                setInnError(!validateInn(event.target.value));
                successfull();
        }

    const [ton, setTon] = useState('any');
        const tonalityOptions = [{value: 'any', label: 'Любая'}, {value: 'negative', label: 'Негативная'}, { value: 'positive', label: 'Позитивная' }];
        const options = tonalityOptions.map((option) => {
                return <option className={styles.select__option} key={option.value} value={option}>{option.label}</option>;
            });

    const quantity = useRef();
    const [quantityError, setQuantityError] = useState(false);
        const quantityInput = (event) => {
            const numbers = event.target.value;
            if (numbers > 1000 || numbers.length > 4){
                quantity.current.value = "1000";
            }
            if (numbers === "0" || numbers < 0 || numbers === "-0"){
                quantity.current.value = "1";
            }
            setQuantityError(!numbers);
            successfull();
        }

        const quantityInputBlur = () => {
            successfull();
        }
 
    const [dateError, setDateError] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState("Дата начала");
    const [selectedEndDate, setSelectedEndDate] = useState("Дата конца");

    const [maxCopmleteness, setMaxCopmleteness] = useState(true);
    const [bussinesContext, setBussinesContext] = useState(true);
    const [mainRole, setMainRole] = useState(true);
    const [riskFactor, setRiskFactor] = useState(false);
    const [technik, setTechnik] = useState(false);
    const [notice, setNotice] = useState(true);
    const [news, setNews] = useState(false);
    
        const maxCopmletenessOnChange = (event) => {
            const maxCompl = event.currentTarget.checked;
            setMaxCopmleteness(maxCompl); 
        }    
    
        const bussinesContextOnChange = (event) => {
            const busCont = event.currentTarget.checked;
            setBussinesContext(busCont); 
        } 
    
        const mainRoleOnChange = (event) => {
            const mRole = event.currentTarget.checked;
            setMainRole(mRole); 
        } 
    
        const riskFactorOnChange = (event) => {
            const riskF = event.currentTarget.checked;
            setRiskFactor(riskF); 
        } 
    
        const technikOnChange = (event) => {
            const tech = event.currentTarget.checked;
            setTechnik(tech); 
        } 
    
        const noticeOnChange = (event) => {
            const notic = event.currentTarget.checked;
            setNotice(notic); 
        } 
    
        const newsOnChange = (event) => {
            const nws = event.currentTarget.checked;
            setNews(nws); 
        } 

    const btnRequest = useRef();
   
    async function btnClick() {
        const inn = document.getElementById("inn").value;
        const tonality = options.value;
        const limit = quantity.current.value;
        
        btnRequest.current.disabled = true;

        dispatch(setHistogramDate(undefined));
        dispatch(setPublicationsList(undefined));

        navigate("/results");

        await RequestToApi.getHistograms(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice)
            .then(response => {
                dispatch(setHistogram(response));
            })
            .catch(response => {
                console.log("Error. " + JSON.stringify(response));
            });

        await RequestToApi.getPublicationsList(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice)
            .then(response => {
                dispatch(setPublicationsList(response.data.items));
            })
            .catch(response => {
                console.log("Error. " + JSON.stringify(response))
            });
    }
    const [completed, setCompleted] = useState(false);
    

    const successfull = () => {
        const inn = document.getElementById("inn");
        
        setCompleted(!innError && !quantityError && !dateError && 
            quantity.current.value &&
            inn?.value && inn?.value.length >= 10 &&
            selectedStartDate !== "Дата начала" && selectedEndDate !== "Дата конца");
    }

    useEffect(successfull);

    
    return (
        <>
        <section className={styles.requestWindow__container}>
             <form className={styles.container__form}>
                 <div className={styles.leftBox__firstBlock}>
                        <div className={styles.firstBlock__column1}>
                             <div className={ styles.column1__inn}>
                                 <label htmlFor="inn">ИНН компании*</label>
                                 <input type="number" name="inn" id="inn" min="10" max="10" background-color="white" onBlur={innInputBlur} onChange={innInput} placeholder="10 цифр" required  className={!innError ? styles.inn__input_ok : styles.input_error}></input>
                                 {innError && <p className={styles.p_error}>Введите корректные данные</p>}
                             </div>

                             <div className={styles.column1__tonality}>
                             <label htmlFor="tonality">Тональность</label>
                                 <select className={styles.tonality__select} name="tonality" id="tonality" 
                                 value = {ton}  onChange={(event) => setTon(event.target.value)} >
                                    {options}
                                 </select>
                             </div>
                             <div className={styles.column1__quantity}>
                                 <label htmlFor="quantity">Количество документов в выдаче*</label>
                                 <input ref={quantity} type="number" name="quantity" id="quantity" min="1" max="10000" onBlur={quantityInputBlur} onChange={quantityInput} placeholder="от 1 до 1000" required className={!quantityError ? styles.quantity__input_ok : styles.input_error}></input>
                                 {quantityError && <p className={styles.p_error}>Введите корректные данные</p>}
                             </div>
                        </div>
                          
                     <div className={styles.firstBlock__column2}>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="maxCopmleteness" name="maxCopmleteness" onChange={maxCopmletenessOnChange} checked={maxCopmleteness} ></input>
                             <label htmlFor="maxCopmleteness">Признак максимальной полноты</label>
                         </div>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="bussinesContext" name="bussinesContext" onChange={bussinesContextOnChange} checked={bussinesContext} ></input>
                             <label htmlFor="bussinesContext">Упоминания в бизнес-контексте</label>
                         </div>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="mainRole" name="mainRole" onChange={mainRoleOnChange} checked={mainRole} ></input>
                             <label htmlFor="mainRole">Главная роль в публикации</label>
                         </div>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="riskFactor" name="riskFactor" onChange={riskFactorOnChange} checked={riskFactor} disabled ></input>
                             <label htmlFor="riskFactor">Публикации только с риск-факторами</label>
                         </div>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="technik" name="technik" onChange={technikOnChange} checked={technik} disabled ></input>
                             <label htmlFor="technik">Включать технические новости рынков</label>
                         </div>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="notice" name="notice" onChange={noticeOnChange} checked={notice} ></input>
                             <label htmlFor="notice">Включать анонсы и календари</label>
                         </div>
                         <div className={styles.column2_stroke}>
                             <input type="checkbox" id="news" name="news" onChange={newsOnChange} checked={news} disabled ></input>
                             <label htmlFor="news">Включать сводки новостей</label>
                         </div>
                     </div>    
                </div>    
                 <p className={styles.leftBox__range}>Диапазон поиска*</p>
                    <div className={styles.leftBox__secondBlock}>
                         <div className={styles.secondBlock__dateInputs_column} >
                             <div className={styles.secondBlock__dateInputs_row}>
                                 <DateRangeInputs selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate} isError={dateError} setError={setDateError} />
                             </div>
                             {dateError && <p className={styles.p_error} target="dateRange">Введите корректные данные</p>}
                         </div>
                         <button className={styles.secondBlock__btn} ref={btnRequest} onClick={btnClick} disabled={!completed}>Поиск</button>
                     </div>
                 <p className={styles.leftBox__txt}>* Обязательные к заполнению поля</p>
            </form> 
        </section>

        </>
    );
}