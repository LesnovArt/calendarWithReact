import React from "react";
import styles from "./errorMesage.module.scss";
import errorImg from "./error-icon-28.png";

export default function ErrorMessage (){
  return (
    <div className={styles.errorWrapper}>
      <img className={styles.errorImg} src={errorImg} alt=""/>
      <p className={styles.errorText}>
        Вай мэээээ...
      </p>
    </div>
  )
}
