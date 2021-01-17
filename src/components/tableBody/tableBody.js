import React from "react";
import { useState, useEffect } from 'react'
import TeamHead from "../teamHead/teamHead";
import TeamBody from "../teamBody/teamBody";
import PropTypes from "prop-types";

function TableBody (props) {

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
    let result = procent;
    function getProcent(count, realm) {
        arrCount.push({
            count: count,
            realm: realm
        })
        result = arrCount.reduce(function(sum, current) {
            return current.count + sum;
          }, 0);
    }
    useEffect(() => {
        setProcent(result);
      });

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
                  getProcent = {getProcent}
                  dayForFooter = {props.dayForFooter}
                  usersVacationsCount = {props.usersVacationsCount}
                   />
               )
            }
        </tbody>
    );
}

TableBody.propTypes = {
  arrDays: PropTypes.arrayOf(PropTypes.shape({
    dayName: PropTypes.string,
    dayOfMonth: PropTypes.number,
    fullDate: PropTypes.string,
    isDayOff: PropTypes.bool,
    isVacation: PropTypes.bool,
    })
  ).isRequired,
  dayForFooter: PropTypes.func,
  department: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    realm: PropTypes.string,
    }).isRequired
  ),
  setNewVacations: PropTypes.func,
  usersVacationsCount: PropTypes.func,
  vacationsDepartment: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      realm: PropTypes.string,
      vacations: PropTypes.arrayOf(PropTypes.shape({
        endDate: PropTypes.string,
        id: PropTypes.number,
        startDate: PropTypes.string,
        type: PropTypes.string,
        userId: PropTypes.number,
        }))
      })),
    realm: PropTypes.string,
  }).isRequired
};

TableBody.defaultProps = {
  arrDays: PropTypes.arrayOf(PropTypes.shape({
    dayName: 'empty',
    dayOfMonth: 0,
    fullDate: '0',
    isDayOff: false,
    isVacation: false,
    })
  ),
  dayForFooter: () => {},
  department: 'unknown',
  members: [],
  setNewVacations: () => {},
  usersVacationsCount:() => {},
  vacationsDepartment: {}
};

export default TableBody;





