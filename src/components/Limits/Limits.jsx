import React from "react";
import { useState } from "react";
import styles from "./Limits.module.scss"
import RequestToApi from "../../services/RequestToApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../Loading/Loading";


const Limits = () => {
    const isAuth = useSelector(state => state.account.isAuth);
    const [limits, setLimits] = useState([]);
  useEffect(() => {
    fetchLimits();
  }, []);
  const fetchLimits = () => {

    RequestToApi.getInfo()
       .then((res) => {
        
        setLimits(res.data.eventFiltersInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

var usedCompanyCount = (<span className={styles.quantity__usedCompany}>{limits.usedCompanyCount}</span>);
var companyLimit = (<span className={styles.quantity__limitCompany}>{limits.companyLimit}</span>);                     

  return (
    (isAuth &&
      
    <div className={styles.userMenu__limitsBox}>
        {(companyLimit === 0  && <Loading />)
        ||
        (<>
       <div className={styles.limitsBox__limits}>
            <p className={styles.limits__p}>Использовано компаний</p> 
            <p className={styles.limits__p}>Лимит по компаниям</p>    
        </div>
        <div className={styles.limitsBox__quantity}>
          {usedCompanyCount}
          {companyLimit}
         </div>
         </> )}      
    </div>
  )
  );
};
export default Limits;




