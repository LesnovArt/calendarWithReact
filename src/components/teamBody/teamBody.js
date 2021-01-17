import React from "react";
import classNames from "classnames";
import axios from "axios";
import PropTypes from "prop-types";

function TeamBody(props) {
    let arrVacationInCurrentMonth =  []
    let arrVacationCurrentMember = props.member.vacations;

    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
      };

    function convertedDate(day){
        return new Date(day.split(".").reverse().join("-"))
    }
    function getObjVacation(id,start,end,type) {
        return {
            id: id,
            start: start,
            end: end,
            type:type,
            getDuraction () {
                return (this.end - this.start)+1
            }   
        }
    }

    function vacationInCurrentMonth (arrVacationsCurrentMember) {
        let startMonth = new Date(convertedDate(props.arrDays[0].fullDate))
        let endMonth = new Date(convertedDate(props.arrDays[props.arrDays.length-1].fullDate))

        arrVacationsCurrentMember.forEach((vacation) => {
            let startVacation = convertedDate(vacation.startDate)
            let endVacation = convertedDate(vacation.endDate)
            if(startVacation>=startMonth && endVacation<=endMonth) {
                arrVacationInCurrentMonth.push(getObjVacation(
                    vacation.id,
                    new Date(startVacation.getTime()).getDate(),
                    new Date(endVacation.getTime()).getDate(),
                    vacation.type))
            } else if(startVacation>=startMonth && startVacation<=endMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(
                    vacation.id,
                    new Date(startVacation.getTime()).getDate(),
                    new Date(endMonth.getTime()).getDate(),
                    vacation.type))
            } else if(startVacation<=startMonth && endVacation<=endMonth && endVacation>=startMonth){
                arrVacationInCurrentMonth.push(getObjVacation(
                    vacation.id,
                    new Date(startMonth.getTime()).getDate(),
                    new Date(endVacation.getTime()).getDate(),
                    vacation.type))
            } else if(startVacation<=startMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(
                    vacation.id,
                    new Date(startMonth.getTime()).getDate(),
                    new Date(endMonth.getTime()).getDate(),
                    vacation.type))
            }
          });
    }

    if(arrVacationCurrentMember.length){
        vacationInCurrentMonth (arrVacationCurrentMember)   
    }
         
    function deleteVacation(element) {
      let isDelete = window.confirm("Delete this vacation?")
      let attribute = element.getAttribute('data-id'); 
      const url = `http://localhost:3004/vacations/${attribute}`;   
        if(isDelete){
            axios
            .delete(url)
            .then (()=>{
               props.setNewVacations() 
            })
            .catch((err) => {
                console.log(err);
            });
        }
        
    }

    function setCount() {
      const sumOfUserVactions = props.arrDays.filter((day)=>day.isVacation && !day.isDayOff).length;
      props.usersVacationsCount(sumOfUserVactions)
      return sumOfUserVactions
    }

    props.arrDays.forEach((day, index) => {
        if(day.isVacation !== undefined ){
            props.dayForFooter(day.isVacation, index) 
        }
    });

    if(!props.isHide){
        return (
            <tr className="member" >
                <td className="member_name" style={color}>
                    <span>{props.member.name}</span>
                </td>
                {props.arrDays.map((day, index) =>{
                    day.isVacation = false;
                    let wrapperClass = classNames('member_day','day', { 'weekend': day.dayName === 'Sa' ||  day.dayName === 'Su'})
                    if(arrVacationInCurrentMonth && arrVacationInCurrentMonth.length) {
                        let vacationAtCurrentDay = arrVacationInCurrentMonth.filter((item) => +day.dayOfMonth >= +item.start && +day.dayOfMonth <= +item.end)
                        if(vacationAtCurrentDay.length) {
                            day.isVacation = true;
                            let typeVacationClass = classNames({ 'UnPd vacations': vacationAtCurrentDay[0].type === 'UnPd'}, {'Pd vacations': vacationAtCurrentDay[0].type === 'Pd'} )
                            if(+day.dayOfMonth === vacationAtCurrentDay[0].start) {
                                return <td key={`w-td${index}`} className={wrapperClass + ' vacationHover'} data-id={vacationAtCurrentDay[0].id } onClick={(e)=>deleteVacation(e.target.closest("td"))}>
                                    <span className={typeVacationClass} style={{ width: 'calc(34*' + vacationAtCurrentDay[0].getDuraction() + 'px - 3px)' , backgroundColor: props.color + ' 1)', border: '2px solid ' + props.color + ' 1)', color: props.color + ' 1)'}}>{vacationAtCurrentDay[0].type}</span></td>
                            } else {
                                return <td key={`td${index}`} className={wrapperClass + ' vacationHover'} data-id={vacationAtCurrentDay[0].id} onClick={(e)=>deleteVacation(e.target.closest("td"))}><span></span></td>
                            }
                        } else { 
                            return <td key={`td${index}`} className={wrapperClass}></td>  
                        }
                    } else {
                        return <td key={`td${index}`} className={wrapperClass} ></td>
                    }
                    })
                }
                    {
                        props.getProcent(setCount(), props.member.realm) 
                    }
                <td className="member_sum day">
                   <span>{setCount()}</span>
                </td>
            </tr>
        )
    } 
    else  {
        return <></>
    }
}

TeamBody.propTypes = {
  arrDays: PropTypes.arrayOf(PropTypes.shape({
    dayName: PropTypes.string,
    dayOfMonth: PropTypes.number,
    fullDate: PropTypes.string,
    isDayOff: PropTypes.bool,
    isVacation: PropTypes.bool,
    })
  ).isRequired,
  color: PropTypes.string,
  dayForFooter: PropTypes.func,
  getProcent: PropTypes.func,
  isHide: PropTypes.bool,
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
  })).isRequired,
  setNewVacations: PropTypes.func,
  usersVacationsCount: PropTypes.func,
};

TeamBody.defaultProps = {
  arrDays: [],
  color: "255, 255, 255",
  dayForFooter: () => {},
  getProcent: () => {},
  isHide: false,
  department: 'unknown',
  members: [],
  setNewVacations: () => {},
  usersVacationsCount:() => {},
};

export default TeamBody;






