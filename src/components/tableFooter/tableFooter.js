import React from "react";
import style from "./tableFooter.module.scss";

function TableFooter({ arrDays, users, vacations, currentDate }) {
  let sumVacationForDay = [];

  function addVacationsToUser(users, vacations) {
    users.forEach((user) => {
      vacations.forEach((vacation) => {
        if (user.id === vacation.userId) {
          user.vacation.push(vacation)
        }
      })
    })
  }
  addVacationsToUser(users, vacations)

  function cleanSumArray(array){
    while(array.length > 0) {
      array.pop();
    }
  }

  function getSumsVocationForDay() {
    cleanSumArray(sumVacationForDay);

    arrDays.forEach((day) => {
      let count = 0;
      users.forEach((user) => {

        if (user.vacation.length > 0) {

          user.vacation.forEach((vacation) => {
            const currentMonthandYear = day.fullDate.slice(3, 10);
            const vacationMonthandYear = vacation.startDate.slice(3, 10);

            if (vacationMonthandYear ===  currentMonthandYear) {
              let startDay = vacation.startDate.slice(0,2);
              let endDay = vacation.endDate.slice(0,2);

              if(day.dayOfMonth >=  Number(startDay) && day.dayOfMonth <= Number(endDay) && !day.isDayOff){
                day.isVacDay = true;
                count++
              }
            }
          })
        }
      })
    sumVacationForDay.push(count);
    })
  return sumVacationForDay;
  }

  return (
        <tbody>
          <tr className={style.statsRow}>
            <td className={style.statsRow__name}>Day-Person Stats</td>
            {arrDays.map((cell, index) => (
              cell.isDayOff ? 
              (<td className={style.statsRow__outputItem} key={`${index}tfoot`}></td>)
              :
              (<td className={style.statsRow__outputItem} key={`${index}tfoot`}>{getSumsVocationForDay()[index]}</td>)
            ))}
            <td className={style.sumCell}></td>
          </tr>
        </tbody>
  );
}

export default TableFooter;
