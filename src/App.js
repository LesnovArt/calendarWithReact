import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MonthSwitcher from "./components/monthSwitcher/monthSwitcher";
import TableHead from "./components/tableHead/tabelHead";
import TableBody from "./components/tableBody/tableBody";
import TableFooter from "./components/tableFooter/tableFooter";
import MonthVacationCounter from "./components/monthVacationCounter/monthVacationCounter";
import Moment from "react-moment";
import PropTypes from "prop-types";
import moment from "moment";
// import Data from "./components/Data/Data";

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [members, setPost] = useState([1]);
  const arrDays = [];

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
    let departments = Array.from(set);
    departments.sort();

    return departments;
  }

  function getDepartment(department, arrMembers) {
    return arrMembers.filter((member) => member.realm === department);
  }

  function createCells() {
    const daysInCurrentMonth = currentDate.clone().endOf("month").format("DD");
    // const chosenDate = new Date(this.date.getFullYear(), this.date.getMonth(), index);
    // const [dayName, , date] = dateFormatter.format(chosenDate).replace(",", "").split(" ");
    // const isWeekend = dayName === "Sat" || dayName === "Sun";
    for (let i = 1; i <= Number(daysInCurrentMonth); i++) {
      arrDays.push(i);
    }
    return arrDays;
  }

  return (
    <div className="wrapper">
      <Moment />
      <MonthSwitcher currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div className="table-wrapper">
        <table>
          <thead>
            <TableHead currentDate={currentDate} setCurrentDate={setCurrentDate} createCells={createCells} arrDays={arrDays} />
          </thead>
          {getDepartments().map((department) => (
            <tbody>
              <TableBody members={getDepartment(department, members)} department={department} />
            </tbody>
          ))}
          <TableFooter />
        </table>
      </div>
      <MonthVacationCounter />
    </div>
  );
}

export default App;
