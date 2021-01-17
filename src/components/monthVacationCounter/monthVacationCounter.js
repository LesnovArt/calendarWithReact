import React from "react";
import style from "./monthVacationCounter.module.scss";

function MonthVacationCounter({ currentDate, footer, members, usersVacationsArray }) {

  function getTotalPercentForMonth () {
    const totalPercentForMonth = getTotalVacationsInMonth() * 100 / getTotalDaysInMonth();
    return Math.round(totalPercentForMonth);
  }

 function getTotalVacationsInMonth() {
       const totalVacSum = footer.reduce((acc, sumForMember) => {
      return acc + sumForMember;
    })
    return totalVacSum;
 }

  function getTotalDaysInMonth() {
    const totalDays = members.length * footer.length;
    return totalDays;
  }

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
        <span className={style.teamsCount}>{usersVacationsArray.length/2}</span>
        <span className={style.teamsPercent}>{`${getTotalPercentForMonth()} %`}</span>
      </div>
    </div>
  );
}

export default MonthVacationCounter;
