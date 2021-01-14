import React from "react";
import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import MonthSwitcher from "./components/monthSwitcher/monthSwitcher";
import TableHead from "./components/tableHead/tableHead";
import TableBody from "./components/tableBody/tableBody";
import TableFooter from "./components/tableFooter/tableFooter";
import MonthVacationCounter from "./components/monthVacationCounter/monthVacationCounter";
import PropTypes from "prop-types";
import moment from "moment";
import { createCells } from "./helpers/cellsCreator.js"
import Popup from "./components/popup/popup";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import VacationForm from "./components/vacationForm/vacationForm";
import ErrorMessage from "./components/errorMessage/errorMessage";
// import Data from "./components/Data/Data";

export const PopupContext = createContext();

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [users, setUsers] = useState([])
  const [vacations, setVacations] = useState([])
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [hasError, setHasError] = useState(false);


  function togglePopup (){
    setIsPopupShow( prev => !prev);
  }

  function showError () {
    setHasError( prev => prev = true);
  }

  function hideError () {
    setHasError( prev => prev = false);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3004/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  useEffect(() => {
    setNewVacations();
  }, []);
  
  function setNewVacations(){
      axios
        .get(`http://localhost:3004/vacations`)
        .then((res) => {
          setVacations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  
  if(users.length) {
    let members = users;
    let arrVacations = vacations;    
    function getDepartments() {
      let arrOfDepartments = [];
      for (let i = 0; i < members.length; i++) {
        arrOfDepartments.push(members[i].realm);
      }
      let set = new Set();
      for (let i = 0; i < arrOfDepartments.length; i++) {
        set.add(arrOfDepartments[i]);
      }
      let departments = Array.from (set);
  
      return departments
    }
    let arrDepartmentVacations = [];
    for(let i = 0; i<getDepartments().length; i++){
      let department = getDepartments()
      let objDepartmentVacation = {
      realm: department[i]
      }
      arrDepartmentVacations.push(objDepartmentVacation)
    }
    for(let i = 0; i<arrDepartmentVacations.length; i++){
      checkDepartmentID(arrDepartmentVacations[i],members)
      checkDepartmentVacations(arrDepartmentVacations[i],arrVacations)
    }
function checkDepartmentID(department,arrMembers) {
  department.members = []
  for(let i = 0; i<arrMembers.length; i++){
    if(department.realm === arrMembers[i].realm) {
      department.members.push({
        id: arrMembers[i].id,
        name: arrMembers[i].name,
        realm: arrMembers[i].realm
      })
    }
  }
}
function checkDepartmentVacations (department,arrVacation) {
  for(let i = 0; i<department.members.length; i++){
    department.members[i].vacations = [];
    if(arrVacation.length) {
      addVacationToUser(arrVacation,department.members[i])  
    }
  }
}
function addVacationToUser(arrVacation,departmentMember) {
  for(let j = 0; j<arrVacation.length; j++){
    if(departmentMember.id === arrVacation[j].userId) {
      departmentMember.vacations.push(arrVacation[j])
    }
  } 
}
  function getDepartment(department, arrMembers) {
    return arrMembers.filter((member) => member.realm === department);
  }
  function getVacations(department, vacationsDepartments) {
    for(let i = 0; i < vacationsDepartments.length; i++) {
      if(vacationsDepartments[i].realm === department) {
        return vacationsDepartments[i];
      }
    }
  }
  const arrDays = createCells(currentDate.startOf("month"));
  // console.log(arrDays)
  
  // console.log(users)
      const table = [];
      const month = []
  function getTable(arrDays, users) {
    arrDays.map((cell) => {
      const day = []
      day.push(cell)
      // table.push(users)
       
      // table.push((users.map((user) => {
      //   // console.log(table)
      // })))
      console.log(day)
    })
console.log(table)
  }
  getTable(arrDays, users)

        return (
      <div className="wrapper">
      <ErrorBoundary
        showError = {showError}
        togglePopup = {togglePopup}
      >
        <PopupContext.Provider value={{
          togglePopup: togglePopup,
          showError: showError,
          hideError: hideError,
          members: members,
          setNewVacations: setNewVacations

        }}>
        <MonthSwitcher currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <div className="table-wrapper">
          <table>
            <thead>
              <TableHead arrDays={arrDays} /> 
            </thead>
            {getDepartments().map((department) => (
                <TableBody members={getDepartment(department, users)} department={department} vacationsDepartment = {getVacations(department, arrDepartmentVacations)} arrDays={arrDays} setNewVacations = {setNewVacations}/>
            ))}
            <TableFooter arrDays={arrDays} users={users}/>
          </table>
        </div>
        <MonthVacationCounter currentDate={currentDate} members={members}/>
          { isPopupShow && 
          <Popup>
          {isPopupShow && !hasError ? <VacationForm/> : null}
          {hasError && isPopupShow ? <ErrorMessage/>: null}
        </Popup> }
        </PopupContext.Provider>
        </ErrorBoundary>
      </div>
    );
 } else {
   return <></>
 }
}
export default App;
