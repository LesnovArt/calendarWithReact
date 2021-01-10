import React from "react";
import TeamHead from "../teamHead/teamHead";
import TeamBody from "../teamBody/teamBody";
import style from "./tableBody.module.scss";

function TableBody(props) {
    console.log(props)
    
    let color;    
    (function departmentColor (){
        switch (props.department) {
        case 'Frontend Team':
            color = 'rgba(155, 153, 255, '
            break;
        case 'Backend Team':
            color = 'rgba(122, 175, 255, '
            break;
        case 'Designers':
            color = 'rgba(255, 153, 153, '
            break;
        default:
            // let randomColor = Math.floor(Math.random()*16777215).toString(16);
            // color = "#" + randomColor;
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);
            color = `rgba(${r},${g},${b}, `

        }
    })()



    function toggleDepartment (department){
        // isHide = !isHide

    }
    
    return (
        <tbody className = "tableBody">
            <TeamHead teamName = {props.department} members = {props.members} color = {color} toggleDepartment = {toggleDepartment}/> 
            { props.members.map((member) =>
            <TeamBody member = {member} color = {color}/>)
            }
        </tbody>
    );
}

export default TableBody;
