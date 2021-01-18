import React from "react";
import { useState } from 'react';
import classNames from "classnames";
import style from "./teamHead.module.scss";
import PropTypes from "prop-types";

function TeamHead(props) {
    const [rotateArrow, setClass] = useState(false)
    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
        background: props.color + ' 0.2)',
      };
      const backgroundColor = {
        background:props.color + ' 1)'
      }

    function clickArrow(){
       props.toggleDepartment(props.teamName)
       setClass(prevCount => !prevCount)
    }

    let arrWeekends = props.arrDays.filter((day)=>day.isDayOff).length
    let procent = Math.round((props.procent / ((props.arrDays.length-arrWeekends) * props.members.length)) * 100)

    let wrapperClass = classNames(`${style.department_hideArrow}`, { 'rotateArrow': rotateArrow === true })
    return (
    <tr className={style.department} style={color}>
        <td className={style.department_name}>
          <span className={style.department_title}>{props.teamName}</span>
          <div className={style.department_info}>
            <span className={style.department_countMembersIcon}>
                <i className="icon icon-001-group"></i>
            </span>
            <span className={style.department_countMembers}>{props.members.length}</span>
            <span className={style.department_procent} style={backgroundColor} >{procent}%</span>
            <span className={wrapperClass} onClick = {() => clickArrow()}><i className="icon icon-chevron-down-solid"></i></span>
          </div>
        </td>
          {props.arrDays.map((cell, i) =>
              <td key={`team-head${props.arrDays[i].fullDate}`} className={`${style.department_day} day`}></td>)
          }
          <td className={`${style.department_sum} day`}>
              <span></span>
          </td>
    </tr>
  )
}

TeamHead.propTypes = {
  arrDays: PropTypes.arrayOf(PropTypes.shape({
    dayName: PropTypes.string,
    dayOfMonth: PropTypes.number,
    fullDate: PropTypes.string,
    isDayOff: PropTypes.bool,
    isVacation: PropTypes.bool,
    })
  ).isRequired,
  color: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    realm: PropTypes.string,
  })).isRequired,
  procent: PropTypes.number,
  teamName: PropTypes.string,
  toggleDepartment: PropTypes.func,
};

TeamHead.defaultProps = {
  arrDays: [],
  color: "255, 255, 255",
  members: [],
  procent: 0,
  teamName: 'unknown',
  toggleDepartment: () => {},
};

export default TeamHead;