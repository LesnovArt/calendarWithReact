import React, { useContext } from "react";
import styles from "./popup.module.scss";
import { PopupContext } from "../../App";

export default function Popup (props) {

  const { togglePopup, toggleError } = useContext(PopupContext);

    return (
        <div className={styles.popup} onClick={()=> {
          togglePopup();
          toggleError();
        }}>
          {props.children}
        </div>
    )
}
