import React from "react";
import style from "./tableFooter.module.scss";
import PropTypes from "prop-types";

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

TableFooter.propTypes = {
  footer: PropTypes.arrayOf(PropTypes.number).isRequired,
}

TableFooter.defaultProps = {
  footer: [],
};

export default TableFooter;
