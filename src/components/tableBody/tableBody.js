import React from "react";
import { useState } from 'react'
import TeamHead from "../teamHead/teamHead";
import TeamBody from "../teamBody/teamBody";

function TableBody(props) {   
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
    const [procent, setProcent] = useState(0)

    function toggleDepartment (){
        setToggleDepartment (prevCount => !prevCount)
    }


 let arrCount = []
//  let result = 0;
    function getProcent(count, realm) {
        arrCount.push({
            count: count,
            realm: realm
        })
        let result = arrCount.reduce(function(sum, current) {
            return current.count + sum;
          }, 0);

          setProcent(result)
    }


    return (
        
        <tbody className = "tableBody">
            <TeamHead teamName = {props.department} 
            members = {props.members} 
            color = {color} 
            toggleDepartment = {toggleDepartment} 
            arrDays={props.arrDays}
            procent = {procent}
            /> 
            {
                props.vacationsDepartment.members.map((member, index) =>
                   <TeamBody member = {member} 
                   key={`tbody+${index}`}
                   color = {color} 
                   isHide = {isHide} 
                   arrDays={props.arrDays} 
                   setNewVacations = {props.setNewVacations}
                   getProcent = {getProcent}/>
               )
            }
            
        </tbody>
    );
}

export default TableBody;
