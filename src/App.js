import React from "react";
import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import MonthSwitcher from "./components/monthSwitcher/monthSwitcher";
import TableHead from "./components/tableHead/tabelHead";
import TableBody from "./components/tableBody/tableBody";
import TableFooter from "./components/tableFooter/tableFooter";
import MonthVacationCounter from "./components/monthVacationCounter/monthVacationCounter";
import Moment from "react-moment";
import PropTypes from "prop-types";
import moment from "moment";
import { createCells } from "./helpers/cellsCreator.js"
import Popup from "./components/popup/popup";
// import Data from "./components/Data/Data";

export const PopupContext = createContext();

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [members, setPost] = useState([])
  const [isPopupShow, setIsPopupShow] = useState(true);

  function togglePopup (){
    setIsPopupShow( prev => prev = !prev)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3004/users`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function getDepartment(department, arrMembers) {
    return arrMembers.filter((member) => member.realm === department);
  }

  const arrDays = createCells(currentDate.startOf("month"));
  return (
    <div className="wrapper">
      <MonthSwitcher currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div className="table-wrapper">
        <table>
          <thead>
            <TableHead currentDate={currentDate} arrDays={arrDays} createCells={createCells}/>
          </thead>
          {getDepartments().map((department) => (
              <TableBody members={getDepartment(department, members)} department={department} arrDays={arrDays}/>
          ))}
          <TableFooter />
        </table>
      </div>
      <MonthVacationCounter />
      <MonthVacationCounter/>
      <PopupContext.Provider value={togglePopup}>
        { isPopupShow && <Popup/> }
      </PopupContext.Provider>
    </div>

  );
}

export default App;
