import React, { useContext } from "react";
import styles from "./popup.module.scss";
import { PopupContext } from "../../App";
import VacationForm from "../vacationForm/vacationForm";

export default function Popup () {

  const isPopupShow = useContext(PopupContext);

    return (
        <div className={styles.popup} onClick={()=> isPopupShow()}>
            <VacationForm/>
        </div>
    )
}
