import React, { useContext, useState } from "react";
import styles from "./vacationForm.module.scss";
import { PopupContext } from "../../App";
import * as moment from "moment";
import axios from "axios";



export default function VacationForm () {

    const {togglePopup, members, setNewVacations} = useContext(PopupContext);
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [vacationType, setVacationType] = useState('Pd')
    const [userId, setUserId] = useState(1)

    
    const vacationTypesArr = [
      {
        type:'Pd',
        vacationName: 'Paid Day Off (PD)'
      },
      {
        type:'UnPd',
        vacationName: 'Unpaid Day Off (UD)'
      }];

    let vacationCounter;

    function getStartDate (event) {
      event.preventDefault()
        setStartDate(event.target.value);
    }

    function getEndDate (event) {
      event.preventDefault()
        setEndDate(event.target.value);
    }

    function getUserId(event) {    
      setUserId(event.target.value)
    }

    function getVacationType (event) {
      setVacationType(event.target.value)
    }

    function sendPostRequest(){
      console.log(userId)
      // if(startDate && endDate && vacationType && userId) {
        const postObject = {
          id: Number(moment().format('x')),
          startDate: moment(startDate).format('DD.MM.yyyy'),
          endDate: moment(endDate).format('DD.MM.yyyy'),
          userId: Number(userId),
          type: vacationType
        }
        console.log(postObject)
        axios.post(`http://localhost:3004/vacations`, postObject)
          .then(response => setNewVacations( response.data ))
          .catch((err) => {
          console.log(err);
        })
      // }
      togglePopup()
    }



    if(startDate && endDate){
      let start = moment(startDate);
      let end = moment(endDate);
      let duration = moment.duration(start.diff(end));
      duration > 0 ? vacationCounter = duration.asDays() : vacationCounter = duration.asDays() * -1;
    }




    return (
        <div className={styles.form}>
            <div className={styles.form__header}>
                <div className={styles.form__title}>Vacation Request</div>
                <div className={styles.form__counter}>
                    <span className={styles.form__counterDays}>{vacationCounter}</span>
                    <span className={styles.form__counterText}>Days</span>
                </div>
            </div>
            <div className={styles.form__body}>
                <div className={styles.form__users}>
                    <div className={`${styles.form__usersSubtitle} ${styles.subtitle}`}>Users</div>
                    <select className={styles.form__users} onChange={getUserId}
                    >
                      <optgroup>
                        {members.map(member => {
                          return (
                            <option value={member.id} id={member.id} key={member.id}
                            >{member.name}</option>
                          )
                        })}
                      </optgroup>
                    </select>
                </div>
                <div className={styles.form__date}>
                    <div className={`${styles.form__dateSubtitle} ${styles.subtitle}`}>Dates</div>
                    <div className={styles.form__dateInputsWrapper}>
                        <div className={styles.form__dateInputWrapper}>
                            <span className={styles.form__dateInputName}>From</span>
                            <input className={`${styles.form__dateInputStart} ${styles.input}`} type='date'
                                  onChange={event => getStartDate(event)} value={startDate}
                            />
                        </div>
                        <div className={styles.form__dateInputWrapper}>
                            <span className={styles.form__dateInputName}>To</span>
                            <input className={`${styles.form__dateInputEnd} ${styles.input}`} type='date'
                                   onChange={event => getEndDate(event)} value={endDate}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.form__vacation}>
                    <div className={`${styles.form__vacationSubtitle} ${styles.subtitle}`}>Vac Type</div>
                    <select className={styles.form__vacationType} onChange={getVacationType}
                    >
                      {vacationTypesArr.map((vacType, index) =>{
                        return(
                          <option value={vacType.type} type={vacType.type} id={index} key={index}
                          >{vacType.vacationName}</option>
                        )
                      })}
                    </select>
                </div>
            </div>
            <div className={styles.form__footer}>
                <button className={`${styles.form__footerCancelBtn} ${styles.btn}`}
                        onClick={()=>togglePopup()}>Cancel</button>
                <button className={`${styles.form__footerSendBtn} ${styles.btn}`}
                        onClick={()=> sendPostRequest()}>Send</button>
            </div>
        </div>
    )
}
