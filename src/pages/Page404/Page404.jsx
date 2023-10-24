import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Page404.module.scss";
import { Link } from "react-router-dom";

function Page404() {
    return (
        <>
            <Header />
            <main className={styles.container}>
                <h1>ОШИБКА! </h1> 
               <Link to="/search">Вернуться на главную!</Link>
            </main>
            <Footer />
        </>
    );
}

export default Page404;