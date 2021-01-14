import React from "react";
import style from "./tableFooter.module.scss";

function TableFooter({ arrDays, users }) {

  // users.map((user) => {
  //   user.vacation.push(arrDays);
  //   })
  // // users.push(vacations)
  // // console.log(users)

  // function sumForDay (users) {
  //   users.forEach((user) => console.log(users) )
  // };

  // sumForDay(arrDays);

  return (<tr className={style.statsRow}>
    <td className={style.statsRow__name}>Day-Person Stats</td>
    {arrDays.map((cell) => (
      cell.isDayOff ? 
      (<td className={style.statsRow__outputItem}></td>)
      :
      (<td className={style.statsRow__outputItem}>0</td>)
    ))}
    <td className={style.sumCell}></td>
  </tr>
);
}

export default TableFooter;
