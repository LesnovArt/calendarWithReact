import React from "react";
import TeamHead from "../teamHead/teamHead";
import TeamBody from "../teamBody/teamBody";
import style from "./tableBody.module.scss";

function TableBody(props) {
    console.log(props.members)

    return (
        <tbody className = "tableBody">
            <TeamHead teamName = {props.department}/> 
            {props.members.map((member) =>
            <TeamBody member = {member}/>)
            }
        </tbody>
    );
}

export default TableBody;
