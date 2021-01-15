import React from "react";
import style from "./tableFooter.module.scss";

function TableFooter({ arrDays }) {

  return (<tbody>
            <tr className={style.statsRow}>
              <td className={style.statsRow__name}>Day-Person Stats</td>
              {arrDays.map((cell, index) => (
                cell.isDayOff ? 
                (<td className={style.statsRow__outputItem} key={`tfoot + ${arrDays[index].fullDate}`}></td>)
                :
                (<td className={style.statsRow__outputItem} key={`foot + ${arrDays[index].fullDate}`}>0</td>)
              ))}
              <td className={style.sumCell}></td>
            </tr>
          </tbody>
        );
}

export default TableFooter;
