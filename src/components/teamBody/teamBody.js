import React from "react";
import style from "./teamBody.module.scss";
import classNames from "classnames"

function TeamBody(props) {
console.log(props)
    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
      };

  
    if(!props.isHide){
        return (
            <tr className="member" >
                <td className="member_name" style={color}>
                    <span>{props.member.name}</span>
                </td>
                {props.arrDays.map((day) =>{
                    let wrapperClass = classNames('member_day','day', { 'restDay': day.dayName === 'Sa' ||  day.dayName === 'Su'})
                    return <td className={wrapperClass} ></td>})
                }
                    
                <td className="member_sum day">
                    <span>0</span>
                </td>                
            </tr>
        )
    } 
    else  {
        return <></>
    }
}

export default TeamBody;
