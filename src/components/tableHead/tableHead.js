import React, { useContext } from "react";
import style from "./tableHead.module.scss";
import { PopupContext } from "../../App";

function TableHead({ arrDays }) {
  const { togglePopup } = useContext(PopupContext);
  return (<tr className={style.calendarRow}>
        <td className={style.calendarRow__addVacationCell}>
          <button className={style.calendarRow__addVacationBtn} onClick={()=> togglePopup()}>
            <span className={style.plus}>+</span>Add Vacation
          </button>
        </td>
        {arrDays.map((cell, index) => (
          cell.isDayOff ? 
          (<td className={`${style.calendarRow__outputItem}, ${style.weekend}`} key={`w-thead${arrDays[index].fullDate}`}>
            <span className={style.calendarRow__outputDay}>{cell.dayName}</span>
            <span className={style.calendarRow__outputDate}>{cell.dayOfMonth}</span>
          </td> )
          :
          (<td className={style.calendarRow__outputItem} key={`thead${arrDays[index].fullDate}`}>
            <span className={style.calendarRow__outputDay}>{cell.dayName}</span>
            <span className={style.calendarRow__outputDate}>{cell.dayOfMonth}</span>
          </td>)
        ))}
        <td className={style.sumCell}>Sum</td>
      </tr>
  );
}

export default TableHead;