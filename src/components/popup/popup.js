import React, { useContext } from "react";
import styles from "./popup.module.scss";
import { PopupContext } from "../../App";

export default function Popup (props) {

  const { togglePopup, hideError } = useContext(PopupContext);

    return (
        <div className={styles.popup} onClick={()=> {
          togglePopup();
          hideError();
        }}>
          {props.children}
        </div>
    )
}
