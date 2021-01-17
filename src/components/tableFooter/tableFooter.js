import React from "react";
import style from "./tableFooter.module.scss";

function TableFooter({ footer }) {
  return (
          <tbody>
            <tr className={style.statsRow}>
              <td className={style.statsRow__name}>Day-Person Stats</td>
              {footer.map((cell, index) => (
                cell.isDayOff ? 
                (<td className={style.statsRow__outputItem} key={`w-tfoot${index}`}></td>)
                :
                (<td className={style.statsRow__outputItem} key={`tfoot${index}`}>{cell}</td>)
              ))}
              <td className={style.sumCell}></td>
            </tr>
          </tbody>
);

}

export default TableFooter;
