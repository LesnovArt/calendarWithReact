import React from "react";
import classNames from "classnames"
import axios from 'axios'

function TeamBody(props) {
// console.log(props)
    let arrVacationInCurrentMonth =  []
    let arrVacationCurrentMember = props.member.vacations;


    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
      };
    const backgroundColor = {
        // backgroundColor: props.color + ' 1)',
        border: '1px solid ' + props.color + ' 1) '
    }

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
        for(let i=0; i<arrVacationsCurrentMember.length; i++) {  
            let startVacation = convertedDate(arrVacationsCurrentMember[i].startDate)
            let endVacation = convertedDate(arrVacationsCurrentMember[i].endDate)
            if(startVacation>=startMonth && endVacation<=endMonth) {
                arrVacationInCurrentMonth.push(getObjVacation(
                    arrVacationsCurrentMember[i].id,
                    new Date(startVacation.getTime()).getDate(),
                    new Date(endVacation.getTime()).getDate(),
                    arrVacationsCurrentMember[i].type))
            } else if(startVacation>=startMonth && startVacation<=endMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(
                    arrVacationsCurrentMember[i].id,
                    new Date(startVacation.getTime()).getDate(),
                    new Date(endMonth.getTime()).getDate(),
                    arrVacationsCurrentMember[i].type))
            } else if(startVacation<=startMonth && endVacation<=endMonth && endVacation>=startMonth){
                arrVacationInCurrentMonth.push(getObjVacation(
                    arrVacationsCurrentMember[i].id,
                    new Date(startMonth.getTime()).getDate(),
                    new Date(endVacation.getTime()).getDate(),
                    arrVacationsCurrentMember[i].type))
            } else if(startVacation<=startMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(
                    arrVacationsCurrentMember[i].id,
                    new Date(startMonth.getTime()).getDate(),
                    new Date(endMonth.getTime()).getDate(),
                    arrVacationsCurrentMember[i].type))
            }
        }  
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
        return props.arrDays.filter((day)=>day.isVacation && !day.isDayOff).length    
    }

for(let i = 0; i<props.arrDays.length; i++){
    if(props.arrDays[i].isVacation ==! undefined ){
       props.dayForFooter(props.arrDays[i].isVacation, i) 
    }
    
}
    

    if(!props.isHide){
        return (
            <tr className="member" >
                <td className="member_name" style={color}>
                    <span>{props.member.name}</span>
                </td>
                {props.arrDays.map((day) =>{
                    day.isVacation = false;
                    let wrapperClass = classNames('member_day','day', { 'restDay': day.dayName === 'Sa' ||  day.dayName === 'Su'})
                    if(arrVacationInCurrentMonth && arrVacationInCurrentMonth.length) {
                        let vacationAtCurrentDay = arrVacationInCurrentMonth.filter((item) => +day.dayOfMonth >= +item.start && +day.dayOfMonth <= +item.end)
                        if(vacationAtCurrentDay.length) {
                            day.isVacation = true;
                            let typeVacationClass = classNames({ 'UnPd vacations': vacationAtCurrentDay[0].type === 'UnPd'}, {'Pd vacations': vacationAtCurrentDay[0].type === 'Pd'} )
                            if(+day.dayOfMonth === vacationAtCurrentDay[0].start) {
                                return <td className={wrapperClass + ' vacationHover'} data-id={vacationAtCurrentDay[0].id } onClick={(e)=>deleteVacation(e.target.closest("td"))}>
                                    <span className={typeVacationClass} style={{ width: 'calc(34*' + vacationAtCurrentDay[0].getDuraction() + 'px - 3px)' , backgroundColor: props.color + ' 1)', border: '2px solid ' + props.color + ' 1)', color: props.color + ' 1)'}}>{vacationAtCurrentDay[0].type}</span></td>
                            } else {
                                return <td className={wrapperClass + ' vacationHover'} data-id={vacationAtCurrentDay[0].id} onClick={(e)=>deleteVacation(e.target.closest("td"))}><span></span></td>
                            }

                        } else { 
                            return <td className={wrapperClass}></td>  
                        }
                    } else {
                        return <td className={wrapperClass} ></td>
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

export default TeamBody;
