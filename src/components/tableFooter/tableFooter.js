import React from "react";
import style from "./tableFooter.module.scss";

function TableFooter({ footer }) {
  return (<tr className={style.statsRow}>
    <td className={style.statsRow__name}>Day-Person Stats</td>
    {footer.map((cell) => (
      cell.isDayOff ? 
      (<td className={style.statsRow__outputItem}></td>)
      :
      (<td className={style.statsRow__outputItem}>{cell}</td>)
    ))}
    <td className={style.sumCell}></td>
  </tr>
);

}

export default TableFooter;
