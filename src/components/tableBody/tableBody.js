import React from "react";
import { useState, useEffect  } from 'react'
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
        case 'Manager':
            color = 'rgba(255, 167, 104, '
            break;
        default:
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);
            color = `rgba(${r},${g},${b}, `
        }
    })()

    const [isHide, setToggleDepartment] = useState(false)

    function toggleDepartment (){
        setToggleDepartment (prevCount => !prevCount)
    }
    return (
        
        <tbody className = "tableBody">
            <TeamHead teamName = {props.department} members = {props.members} color = {color} toggleDepartment = {toggleDepartment} arrDays={props.arrDays}/> 
            {
                props.vacationsDepartment.members.map((member) =>
                   <TeamBody member = {member} color = {color} isHide = {isHide} arrDays={props.arrDays} setNewVacations = {props.setNewVacations}/>
               )
            }
            
        </tbody>
    );
}

export default TableBody;
