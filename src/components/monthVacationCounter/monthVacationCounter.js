import React from "react";
import style from "./monthVacationCounter.module.scss";

function MonthVacationCounter({ currentDate }) {
  return (
    <div className={style.totalBlock}>
      <div className={style.totalBlock__title}>
        <span className={style.title}>{currentDate.format("MMMM")} teams Summary</span>
      </div>
      <div className={style.totalBlock__info}>
        <span className={style.onVacation}>On vacation</span>
        <span className={style.iconGroup}>
          <i className="icon icon-001-group"></i>
        </span>
        <span className={style.teamsCount}>8</span>
        <span className={style.teamsPercent}>12%</span>
      </div>
    </div>
  );
}

export default MonthVacationCounter;
