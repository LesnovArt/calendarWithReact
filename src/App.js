import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import MonthSwitcher from "./components/monthSwitcher/monthSwitcher";
import TableHead from "./components/tableHead/tabelHead";
import TableBody from "./components/tableBody/tableBody";
import TableFooter from "./components/tableFooter/tableFooter";
import MonthVacationCounter from "./components/monthVacationCounter/monthVacationCounter";
import Moment from 'react-moment';
import PropTypes from 'prop-types';
// import Data from "./components/Data/Data";


function App() {

  const [members, setPost] = useState([])

  useEffect(() => {
  axios
    .get(`http://localhost:3004/users`)
    .then(res => {
      setPost(res.data)
    })
    .catch(err => {
      console.log(err)
          })
  },[])



  function getDepartments (){

    let arrOfDepartments = []
    for(let i = 0; i<members.length; i++){
      arrOfDepartments.push(members[i].realm)
    }

    let set = new Set;
    for (let i = 0; i<arrOfDepartments.length; i++){
    set.add(arrOfDepartments[i])
    }
    let departments = Array.from (set);
  
    return departments
  }

  function getDepartment(department, arrMembers) {
    return arrMembers.filter(member => member.realm === department);
  }
 
  return (
    <div className="wrapper">
        {/* <Moment/> */}
      <MonthSwitcher/>
      <div className="table-wrapper">
        <table>
          <TableHead/>
          {getDepartments().map((department) =>
          <TableBody members = { getDepartment(department, members)} department = {department}/>)
          }
          <TableFooter/>         
        </table>
      </div>
      <MonthVacationCounter/>
    </div>

  );
}

export default App;
