import React, { useContext } from "react";
import styles from "./popup.module.scss";
import { PopupContext } from "../../App";

export default function Popup (props) {

  const { hideError } = useContext(PopupContext);

    return (
        <div className={styles.popup} onClick={()=> {
          hideError();
        }}>
          {props.children}
        </div>
    )
}
