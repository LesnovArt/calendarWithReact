import React from "react";
import MonthSwitcher from "./components/monthSwitcher/monthSwitcher";
import TableHead from "./components/tableHead/tabelHead";
import TableBody from "./components/tableBody/tableBody";
import TableFooter from "./components/tableFooter/tableFooter";
import MonthVacationCounter from "./components/monthVacationCounter/monthVacationCounter";
import Moment from 'react-moment';
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import PropTypes from 'prop-types';

function App() {
  return (
      <Contex>
    <div className="wrapper">
        <ErrorBoundary>
            <Moment/>
          <MonthSwitcher/>
          <div className="table-wrapper">
            <TableHead/>
            <TableBody/>
            <TableFooter/>
          </div>
          <MonthVacationCounter/>
        </ErrorBoundary>
    </div>
      </Contex>
  );
}

export default App;
