import React from "react";
import style from "./tableFooter.module.scss";
import moment from "moment"

function TableFooter({ arrDays, users, vacations, currentDate }) {

  function addVacationsToUser(users, vacations) {
    users.map((user) => {
      
      vacations.map((vacation) => {
        if (user.id === vacation.userId) {
          // console.log(user.id)
          // console.log(vacation.userId)
          // console.log(vacations)
          user.vacation.push(vacation)
        }
      })
    })
  }
  addVacationsToUser(users, vacations)


  // console.log(arrDays[0].dayOfMonth)
  const sumVacationForDay = [];
  // arrDays.forEach((day) => {

  //   users.forEach((user) => {

  //     if (user.vacation.length > 0) {

  //       user.vacation.forEach((vacation) => {
  //         const currentMonthandYear = day.fullDate.slice(3, 10);
  //         const vacationMonthandYear = vacation.startDate.slice(3, 10);

  //         if (vacationMonthandYear ===  currentMonthandYear) {
  //           let startDay = vacation.startDate.slice(0,2);
  //           let endDay = vacation.endDate.slice(0,2);

  //           if(day.dayOfMonth >=  Number(startDay) && day.dayOfMonth <= Number(endDay)){
  //             day.isDayOff = true
  //           }
  //         }
  //       })
  //     }
  //   })
  //   console.log(`${day.dayOfMonth} : ${count}`)
  // sumVacationForDay.push(count)
  // })
 
  // console.log(sumVacationForDay)
  // console.log(arrDays)
    function sumCount(arrDays) {
      // let day = []
      console.log(arrDays)
      arrDays.forEach((day) => {
        sumVacationForDay.push(day.isVacDay)
        console.log(day)
        })
      
    }


  return (<tr className={style.statsRow}>
    <td className={style.statsRow__name}>Day-Person Stats</td>
    {arrDays.map((cell, index) => (
      cell.isDayOff ? 
      (<td className={style.statsRow__outputItem}></td>)
      :
                (users.forEach((user) => {

                if (user.vacation.length > 0) {

                  user.vacation.forEach((vacation) => {
                    const currentMonthandYear = cell.fullDate.slice(3, 10);
                    const vacationMonthandYear = vacation.startDate.slice(3, 10);

                    if (vacationMonthandYear ===  currentMonthandYear) {
                      let startDay = vacation.startDate.slice(0,2);
                      let endDay = vacation.endDate.slice(0,2);

                      if(cell.dayOfMonth >=  Number(startDay) && cell.dayOfMonth <= Number(endDay)){
                        cell.isVacDay = true;
                        return <td className={style.statsRow__outputItem}>{sumCount(arrDays)}</td>
                      }
                    }
                  })
                }
              })
        )
    ))}
    <td className={style.sumCell}></td>
  </tr>
);
}

export default TableFooter;
