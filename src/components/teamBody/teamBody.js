import React from "react";
import style from "./teamBody.module.scss";
import classNames from "classnames"
import { useState, useEffect  } from 'react'
import axios from 'axios'
function TeamBody(props) {
    const [arrVacations, setVacation] = useState([])
    let arrVacationInCurrentMonth = [];

    const color = {
        borderLeft: '3px solid ' + props.color + ' 1)',
      };
    const backgroundColor = {
        backgroundColor: props.color + ' 1)'
    }

    useEffect(() => {
        axios
        .get(`http://localhost:3004/vacations`)
        .then((res) => {
            setVacation(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
  
    function convertedDate(day){
        return new Date(day.split(".").reverse().join("-"))
    }

    (function findMember (vacations) {
        let arrVacationsCurrentMember = vacations.filter(element => element.userId === props.member.id);
        vacationInCurrentMonth (arrVacationsCurrentMember) 
    })(arrVacations)

    function getObjVacation(start,end) {
        return {
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
                arrVacationInCurrentMonth.push(getObjVacation(new Date(startVacation.getTime()).getDate(),new Date(endVacation.getTime()).getDate()))
            } else if(startVacation>=startMonth && startVacation<=endMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(new Date(startVacation.getTime()).getDate(),new Date(endMonth.getTime()).getDate()))
            } else if(startVacation<=startMonth && endVacation<=endMonth && endVacation>=startMonth){
                arrVacationInCurrentMonth.push(getObjVacation(new Date(startMonth.getTime()).getDate(),new Date(endVacation.getTime()).getDate()))
            }
            else if(startVacation<=startMonth && endVacation>=endMonth){
                arrVacationInCurrentMonth.push(getObjVacation(new Date(startMonth.getTime()).getDate(),new Date(endMonth.getTime()).getDate()))
            }
        }  
    }
    if(!props.isHide){
        return (
            <tr className="member" >
                <td className="member_name" style={color}>
                    <span>{props.member.name}</span>
                </td>
                {props.arrDays.map((day) =>{
                    let wrapperClass = classNames('member_day','day', { 'restDay': day.dayName === 'Sa' ||  day.dayName === 'Su'})
                    if(arrVacationInCurrentMonth && arrVacationInCurrentMonth.length) {

                        if(arrVacationInCurrentMonth.filter((item) => +day.dayOfMonth >= +item.start && +day.dayOfMonth <= +item.end).length) {
                            return <td className="day"><span className="day vacations" style={backgroundColor}></span></td>
                        } else {
                            return <td className={wrapperClass}></td>  
                        }
                    } else {
                        return <td className={wrapperClass} ></td>
                    }
                    })   
                }
                <td className="member_sum day">
                    <span>0</span>
                </td>                
            </tr>
        )
    } 
    else  {
        return <></>
    }
}

export default TeamBody;
