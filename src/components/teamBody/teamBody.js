import React from "react";
import style from "./teamBody.module.scss";

function TeamBody(props) {
console.log(props)
    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
      };


    let arrDays= []
    for(let i = 1; i<31; i++) {
        arrDays.push(i)
    }
    
    if(!props.isHide){
        return (
            <tr className="member" >
                <td className="member_name" style={color}>
                    <span>{props.member.name}</span>
                </td>
                {arrDays.map((day) =>
                    <td className='member_day day'></td>)
                }
            </tr>
        )
    } 
    else  {
        return <></>
    }
}

export default TeamBody;
