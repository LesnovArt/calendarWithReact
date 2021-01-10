import React from "react";
import style from "./monthSwitcher.module.scss";

function MonthSwitcher({ currentDate, setCurrentDate }) {
  function currentMonthName() {
    return currentDate.format("MMMM");
  }
  function prevMonth() {
    console.log(currentDate)
    return currentDate.clone().subtract(1, "month");
  }
  function nextMonth() {
    return currentDate.clone().add(1, "month");
  }

  return (
    <div className={style.wrapper}>
      <button
        className="navBtn prevMonth"
        onClick={() => {
          setCurrentDate(prevMonth());
        }}
      >
        <i className="fas icon icon-Arrow-2">left</i>
      </button>
      <p className="chosenMonth">{currentMonthName()}</p>
      <button
        className="navBtn nextMonth"
        onClick={() => {
          setCurrentDate(nextMonth());
        }}
      >
        <i className="fas icon icon-Arrow-3">right</i>
      </button>
    </div>
  );
}

export default MonthSwitcher;
