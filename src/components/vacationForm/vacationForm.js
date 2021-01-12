import React, { useContext } from "react";
import styles from "./vacationForm.module.scss";
import { PopupContext } from "../../App";


export default function VacationForm () {

    const {togglePopup} = useContext(PopupContext);
    
    return (
        <div className={styles.form}>
            <div className={styles.form__header}>
                <div className={styles.form__title}>Vacation Request</div>
                <div className={styles.form__counter}>
                    <span className={styles.form__counterDays}>8</span>
                    <span className={styles.form__counterText}>Days</span>
                </div>
            </div>
            <div className={styles.form__body}>
                <div className={styles.form__users}>
                    <div className={`${styles.form__usersSubtitle} ${styles.subtitle}`}>Users</div>
                    <select className={styles.form__users} >
                        <option value="1">user 1</option>
                        <option value="2">user 2</option>
                        <option value="3">user 3</option>
                    </select>
                </div>
                <div className={styles.form__date}>
                    <div className={`${styles.form__dateSubtitle} ${styles.subtitle}`}>Dates</div>
                    <div className={styles.form__dateInputsWrapper}>
                        <div className={styles.form__dateInputWrapper}>
                            <span className={styles.form__dateInputName}>From</span>
                            <input className={`${styles.form__dateInputStart} ${styles.input}`} type='date'/>
                        </div>
                        <div className={styles.form__dateInputWrapper}>
                            <span className={styles.form__dateInputName}>To</span>
                            <input className={`${styles.form__dateInputEnd} ${styles.input}`} type='date'/>
                        </div>
                    </div>
                </div>
                <div className={styles.form__vacation}>
                    <div className={`${styles.form__vacationSubtitle} ${styles.subtitle}`}>Vac Type</div>
                    <select className={styles.form__vacationType} >
                        <option value="1">vacation 1</option>
                        <option value="2">vacation 2</option>
                        <option value="3">vacation 3</option>
                    </select>
                </div>
            </div>
            <div className={styles.form__footer}>
                <button className={`${styles.form__footerCancelBtn} ${styles.btn}`} onClick={()=>togglePopup()}>Cancel</button>
                <button className={`${styles.form__footerSendBtn} ${styles.btn}`}>Send</button>
            </div>
        </div>
    )
}
