import React from "react";
import styles from "./ResultArticles.module.scss";
import HTMLReactParser from "html-react-parser";

function ResultArticles({ data }) {
   
    let markup = data.content.markup;

    markup =  markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">")
                    .replaceAll("<scandoc>", `<div>`)
                    .replaceAll("</scandoc>", "</div>")
                    .replaceAll("<p>", "<span>").replaceAll("</p>", "</span>")
                    .replaceAll("<sentence>", "<p>").replaceAll("</sentence>", "</p>")
                    .replaceAll("<entity", "<span").replaceAll("</entity>", "</span>")
                    .replaceAll("<speech", "<span").replaceAll("</speech>", "</span>")
                    .replaceAll("<vue", "<span").replaceAll("</vue>", "</span>")
                    .replaceAll("<br>", "");

    while (markup.includes("<figure>")) {
        let figureHTML = markup.substring(markup.indexOf("<figure>"));
        figureHTML = figureHTML.substring(0, figureHTML.indexOf("</figure>") + "</figure>".length);

        if (!figureHTML.includes("data-image-src")) {
            markup = markup.replace(figureHTML, "");
            continue;
        }

        let url = figureHTML.substring(figureHTML.indexOf("data-image-src") + "data-image-src=\"".length);
        url = url.substring(0, url.indexOf("\""));

        if (url.includes("span")) console.log(figureHTML);
        markup = markup.replace(figureHTML, `<img src="${url}" alt="Изображение" className={styles.img_data}>`);
    }
    while (markup.includes("<span></span>"))
        markup = markup.replace("<span></span>", "");
    while (markup.includes("<p></p>"))
        markup = markup.replace("<p></p>", "");

        if (markup.length > 1800) {
            markup = markup.substring(0, markup.lastIndexOf("</p>", 1700) + "</p>".length);
            markup += "...";
        }

    markup = HTMLReactParser(markup, "text/xml");

    let titleAttrib = "";
    if(data.attributes.isTechNews){
        titleAttrib = "Технические новости"; 
    } else if(data.attributes.isAnnouncement){
        titleAttrib = "Анонсы и события";
    } else if(data.attributes.isDigest){
        titleAttrib = "Дайджест";
    } else{
        titleAttrib = "Без категории";
    }
    let number = data.attributes.wordCount;
    let word = " ";  
    if (number%10 === 1){  
        word = "cлово"; 
    }else if (number%10 === 2 || number%10 === 3 || number%10 ===4 ){  
        word ="слова";  
    }else {  
        word = 'слов';
    }
  

    return(
    <>  
    <article className={styles.article_container}>
        <div className={styles.article_container__top}>
            <div className={styles.article_container__date_and_author}>
                <span className={styles.article_container__date}>{new Date(data.issueDate).toLocaleDateString().replace("/", ".")}</span>
                <a href={data.url} className={styles.article_container__author}>{data.source.name}</a>
            </div>
            <h1 className={styles.article_container__title}>{data.title.text}</h1>
            <span className={styles.article_container__attribut}>{titleAttrib}</span>
        </div>
       
        <span className={styles.article_container__text}>{markup}</span>
        <div className={styles.article_container__btn_and_wordrs}>
            <button className={styles.article_container__btn}>Читать в источнике</button>
                <span className={styles.article_container__words}>{data.attributes.wordCount} {word}</span>
        </div>
        
    </article>
    </> 
    );
}

export default ResultArticles;