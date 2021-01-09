import React from "react";
import style from "./teamHead.module.scss";

function TeamHead(props) {

    let arrDays= []
    for(let i = 1; i<31; i++) {
        arrDays.push(i)
    }
    
    return (
        <tr>
            <td><h1 className="memberName">{props.teamName}</h1></td>
            {arrDays.map((day) =>
                <td className='day'></td>)
            }
        </tr>
        )
}

export default TeamHead;
