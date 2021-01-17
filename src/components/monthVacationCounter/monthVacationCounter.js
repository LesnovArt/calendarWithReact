import React from "react";
import style from "./monthVacationCounter.module.scss";
import PropTypes from "prop-types";
import { member } from "../"

function MonthVacationCounter({ currentDate, footer, members, usersVacationsArray }) {

  const getTotalVacationsInMonth = () => footer.reduce((acc, sumForMember) => acc + sumForMember);
  const getTotalPercentForMonth = ()  => Math.round(getTotalVacationsInMonth() * 100 / getTotalDaysInMonth());
  const getTotalDaysInMonth = () => members.length * footer.length;
 console.log(  usersVacationsArray)
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

MonthVacationCounter.propTypes = {
  currentDate: PropTypes.object,
  footer: PropTypes.arrayOf(PropTypes.number), 
  member,
  usersVacationsArray: PropTypes.arrayOf(PropTypes.number)
}

MonthVacationCounter.dafaultProps = {
  currentDate: "empty date",
}
export default MonthVacationCounter;
