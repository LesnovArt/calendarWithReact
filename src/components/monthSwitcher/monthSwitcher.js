import React from "react";
import style from "./monthSwitcher.module.scss";
import PropTypes from "prop-types";

function MonthSwitcher({ currentDate, setCurrentDate }) {

  function currentMonthName() {
    return currentDate.format("MMMM YYYY");
  }

  function prevMonth() {
    return currentDate.clone().subtract(1, "month");
  }
  
  function nextMonth() {
    return currentDate.clone().add(1, "month");
  }

  return (
    <div className={style.wrapper}>
      <button
        className={style.wrapper__navBtn}
        onClick={() => {
          setCurrentDate(prevMonth());
        }}
      >
        <i className="fas icon icon-Arrow-2"></i>
      </button>
      <p className={style.wrapper__chosenMonth}>{currentMonthName()}</p>
      <button
        className={style.wrapper__navBtn}
        onClick={() => {
          setCurrentDate(nextMonth());
        }}
      >
        <i className="wrapper__fas icon icon-Arrow-3"></i>
      </button>
    </div>
  );
};

MonthSwitcher.propTypes = {
  currentDate: PropTypes.object.isRequired,
  setCurrentDate: PropTypes.func,
};

MonthSwitcher.defaultProps = {
  currentDate: "empty date",
  setCurrentDate: () => {},
};

export default MonthSwitcher;
