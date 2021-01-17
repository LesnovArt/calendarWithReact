import React from "react";
import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import MonthSwitcher from "./components/monthSwitcher/monthSwitcher";
import TableHead from "./components/tableHead/tableHead";
import TableBody from "./components/tableBody/tableBody";
import TableFooter from "./components/tableFooter/tableFooter";
import MonthVacationCounter from "./components/monthVacationCounter/monthVacationCounter";
import moment from "moment";
import { createCells } from "./helpers/cellsCreator.js"
import Popup from "./components/popup/popup";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import VacationForm from "./components/vacationForm/vacationForm";
import ErrorMessage from "./components/errorMessage/errorMessage";

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
      members.forEach(member => {
        arrOfDepartments.push(member.realm);
      });

      let set = new Set();

      arrOfDepartments.forEach(department => {
        set.add(department);
      });

      let departments = Array.from (set);
  
      return departments
    }

    let arrDepartmentVacations = [];
    getDepartments().forEach((item, index) => {
      let department = getDepartments()
      let objDepartmentVacation = {
      realm: department[index]
      }
      arrDepartmentVacations.push(objDepartmentVacation)
    });

    arrDepartmentVacations.forEach(department => {
      checkDepartmentID(department,members)
      checkDepartmentVacations(department,arrVacations)
    });

function checkDepartmentID(department,arrMembers) {
  department.members = []

  arrMembers.forEach(member => {
    if(department.realm === member.realm) {
      department.members.push({
        id: member.id,
        name: member.name,
        realm: member.realm
      })
    }
  });
}
function checkDepartmentVacations (department,arrVacation) {

  department.members.forEach(member => {
    member.vacations = [];
    if(arrVacation.length) {
      addVacationToUser(arrVacation,member)  
    }
  });

}
function addVacationToUser(arrVacation,departmentMember) {
  arrVacation.forEach(vacation => {
    if(departmentMember.id === vacation.userId) {
      departmentMember.vacations.push(vacation)
    }
  });

}
  function getDepartment(department, arrMembers) {
    console.log(arrMembers.filter((member) => member.realm === department))
    return arrMembers.filter((member) => member.realm === department);

  }
  function getVacations(department, vacationsDepartments) {
    const result = vacationsDepartments.find(item => item.realm === department);
    return result
  }
  const arrDays = createCells(currentDate.startOf("month"));

let footer = [];

arrDays.forEach(() => {
  footer.push(0)
});


function dayForFooter(isTrue, item) {
  footer[item] = footer[item] + Number(isTrue)
}

const usersVacationsArray = [];
function usersVacationsCount(userVacations) {
  if( userVacations > 0) {
    usersVacationsArray.push(userVacations);
  }
}

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

            {getDepartments().map((department, index) => (
                <TableBody key={`team${index}`} usersVacationsCount = {usersVacationsCount} members={getDepartment(department, users)} department={department} vacationsDepartment = {getVacations(department, arrDepartmentVacations)} arrDays={arrDays} setNewVacations = {setNewVacations} dayForFooter = {dayForFooter}/>
            ))}
            <TableFooter footer = {footer}/>

          </table>
        </div>
        <MonthVacationCounter usersVacationsArray= {usersVacationsArray} footer={footer} currentDate={currentDate} members={members}/>
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
