import React from "react";
import style from "./teamBody.module.scss";
import classNames from "classnames"
import { useState, useEffect } from 'react'
import axios from 'axios'

function TeamBody(props) {

    let arrVacationInCurrentMonth =  []
    let arrVacationCurrentMember = props.member.vacations;


    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
      };
    const backgroundColor = {
        backgroundColor: props.color + ' 1)'
    }

    function convertedDate(day){
        return new Date(day.split(".").reverse().join("-"))
    }
    function getObjVacation(id,start,end) {
        return {
            id: id,
            start: start,
            end: end,
            getDuraction () {
                return this.end - this.start
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
                arrVacationInCurrentMonth.push(getObjVacation(arrVacationsCurrentMember[i].id,new Date(startVacation.getTime()).getDate(),new Date(endVacation.getTime()).getDate()))
            } else if(startVacation>=startMonth && startVacation<=endMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(arrVacationsCurrentMember[i].id,new Date(startVacation.getTime()).getDate(),new Date(endMonth.getTime()).getDate()))
            } else if(startVacation<=startMonth && endVacation<=endMonth && endVacation>=startMonth){
                arrVacationInCurrentMonth.push(getObjVacation(arrVacationsCurrentMember[i].id,new Date(startMonth.getTime()).getDate(),new Date(endVacation.getTime()).getDate()))
            } else if(startVacation<=startMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(arrVacationsCurrentMember[i].id,new Date(startMonth.getTime()).getDate(),new Date(endMonth.getTime()).getDate()))
            }
        }  
        console.log(arrVacationInCurrentMonth)
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
    // useEffect(() => {
    //     setCount()
    //     console.log('d')
    //     console.log(props.arrDays)
    //   }, [count]);
    function setCount() {
        return props.arrDays.filter((day)=>day.isVacation && !day.isDayOff).length    
    }
    // props.getProcent(setCount(), props.member.realm) 
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
                            return <td className={wrapperClass} data-id={vacationAtCurrentDay[0].id} onClick={(e)=>deleteVacation(e.target.closest("td"))}><span className="day vacations" style={backgroundColor}></span></td>
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
