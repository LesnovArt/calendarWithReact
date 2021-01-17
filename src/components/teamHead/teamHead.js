import React from "react";
import { useState } from 'react'
import classNames from "classnames"

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

    let wrapperClass = classNames('department_hideArrow', { 'rotateArrow': rotateArrow === true })
    return (
        <tr className="department" style={color}>
            <td className="department_inform">
                <span className="department_title">{props.teamName}</span>
                <div>
                                    <span className="department_countMembersIcon">
                    {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5" clip-path="url(#clip0)">
                        <path
                        d="M10.2676 6.40607H9.3396C9.43419 6.66505 9.48587 6.94454 9.48587 7.23585V10.7433C9.48587 10.8647 9.46473 10.9813 9.42627 11.0897H10.9605C11.5336 11.0897 11.9999 10.6235 11.9999 10.0504V8.13831C11.9999 7.18316 11.2228 6.40607 10.2676 6.40607Z"
                        fill="black" />
                        <path
                        d="M2.51403 7.23585C2.51403 6.94452 2.56571 6.66505 2.6603 6.40607H1.73227C0.777095 6.40607 0 7.18316 0 8.13833V10.0504C0 10.6235 0.466243 11.0898 1.03936 11.0898H2.57363C2.53517 10.9813 2.51403 10.8647 2.51403 10.7433V7.23585Z"
                        fill="black" />
                        <path
                        d="M7.06079 5.5036H4.93918C3.984 5.5036 3.20691 6.2807 3.20691 7.23587V10.7433C3.20691 10.9346 3.36202 11.0898 3.55336 11.0898H8.4466C8.63795 11.0898 8.79305 10.9346 8.79305 10.7433V7.23587C8.79305 6.2807 8.01596 5.5036 7.06079 5.5036Z"
                        fill="black" />
                        <path
                        d="M5.99989 0.910461C4.85117 0.910461 3.91663 1.84501 3.91663 2.99375C3.91663 3.77294 4.34668 4.45345 4.98179 4.81073C5.28303 4.98018 5.63033 5.07702 5.99989 5.07702C6.36946 5.07702 6.71675 4.98018 7.018 4.81073C7.65313 4.45345 8.08316 3.77291 8.08316 2.99375C8.08316 1.84503 7.14861 0.910461 5.99989 0.910461Z"
                        fill="black" />
                        <path
                        d="M2.34195 2.85217C1.48284 2.85217 0.783936 3.55108 0.783936 4.41018C0.783936 5.26929 1.48284 5.96819 2.34195 5.96819C2.55987 5.96819 2.76739 5.92305 2.95589 5.84191C3.28182 5.70159 3.55055 5.4532 3.71684 5.14207C3.83356 4.9237 3.89996 4.67458 3.89996 4.41018C3.89996 3.5511 3.20105 2.85217 2.34195 2.85217Z"
                        fill="black" />
                        <path
                        d="M9.65811 2.85217C8.79901 2.85217 8.1001 3.55108 8.1001 4.41018C8.1001 4.67461 8.1665 4.92372 8.28322 5.14207C8.44951 5.45322 8.71824 5.70162 9.04416 5.84191C9.23267 5.92305 9.44019 5.96819 9.65811 5.96819C10.5172 5.96819 11.2161 5.26929 11.2161 4.41018C11.2161 3.55108 10.5172 2.85217 9.65811 2.85217Z"
                        fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                        <rect width="12" height="12" fill="white" transform="translate(0 0.00012207)" />
                        </clipPath>
                    </defs>
                    </svg> */}
                </span>
                <span className="department_countMembers">{props.members.length}</span>
                <span className="department_procent" style={backgroundColor} >{procent}%</span>
                <span className={wrapperClass} onClick = {() => clickArrow()}><i className="icon icon-chevron-down-solid"></i></span>
                </div>


                {/* <span><i className="icon icon-001-group"></i></span> */}
            </td>
            {props.arrDays.map(() =>
                <td className='department_day day'></td>)
            }
            <td className="'department_sum day">
                <span></span>
            </td>             
        </tr>
        )
}

export default TeamHead;
