import React, { useContext } from "react";
import styles from "./popup.module.scss";
import { PopupContext } from "../../App";
import PropTypes from "prop-types";

export default function Popup ({ children }) {
  const { hideError } = useContext(PopupContext);

    return (
      <div className={styles.popup} onClick={()=> {
        hideError();
        }}>
        {children}
      </div>
    )
};

Popup.propTypes = {
    children: PropTypes.objectOf(PropTypes.array),
};

Popup.defaultProps = {
  children: {},
};
