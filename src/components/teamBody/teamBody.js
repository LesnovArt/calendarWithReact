import React from "react";
import style from "./teamBody.module.scss";

function TeamBody(props) {
    // console.log(props.member)
    let arrDays= []
    for(let i = 1; i<31; i++) {
        arrDays.push(i)
    }
    return (
    <tr>
        <td><h1 className="memberName">{props.member.name}</h1></td>
        {arrDays.map((day) =>
            <td className='day'></td>)
        }
    </tr>
    )
}

export default TeamBody;
