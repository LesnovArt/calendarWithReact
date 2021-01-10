import React from "react";
import style from "./monthSwitcher.module.scss";

function MonthSwitcher({ date, setDate }) {
  function currentMonthName() {
    return date.format("MMMM");
  }
  function prevMonth() {
    return date.clone().subtract(1, "month");
  }
  function nextMonth() {
    return date.clone().add(1, "month");
  }

  return (
    <div className={style.wrapper}>
      <button
        className="navBtn prevMonth"
        onClick={() => {
          setDate(prevMonth());
        }}
      >
        <i className="fas icon icon-Arrow-2">left</i>
      </button>
      <p className="chosenMonth">{currentMonthName()}</p>
      <button
        className="navBtn nextMonth"
        onClick={() => {
          setDate(nextMonth());
        }}
      >
        <i className="fas icon icon-Arrow-3">right</i>
      </button>
    </div>
  );
}

export default MonthSwitcher;
