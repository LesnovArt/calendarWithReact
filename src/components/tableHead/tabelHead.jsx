import React from "react";
import style from "./tableHead.module.scss";

function TableHead({ currentDate, createCells }) {
  return (
    <thead>
      <tr>
        <td className="addVacationCell outputItem ">
          <button className="addVacationBtn">
            <span>+</span>Add Vacation
          </button>
        </td>
        {createCells().map((index) => (
          <td className="outputItem">
            <span className="outputDay">{currentDate.format("dd")}</span>
            <span className="outputDate">{index + 1}</span>
          </td>
        ))}
        <td className="sumCell outputItem weekend">Sum</td>
      </tr>
    </thead>
  );
}

export default TableHead;

// export class Table extends Component {
//   constructor(parentSelector, date, popupWindowContext) {
//     super(parentSelector, "table");
//     this.popupWindowContext = popupWindowContext;
//     this.teamsContext = [];
//     this.date = date;
//     this.component.innerHTML = `<thead><tr class="outputCalendar"></tr></thead>`;
//     this.daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     this.teamSumStats = [];
//     this.foot = {};
//   }

//   generateTableHead() {
//     this.foot = new TeamsFooter(this.component, this.teamSumStats);
//     this.foot.render();
//     let outputCalendarHTML = `<td class="addVacationCell outputItem "><button class="addVacationBtn"><span>+</span>Add Vacation</button></td>`;
//     const outputCalendar = this.component.querySelector(".outputCalendar");
//     for (let index = 1; index <= this.daysInCurrentMonth; index++) {
//       const chosenDate = new Date(this.date.getFullYear(), this.date.getMonth(), index);
//       const [dayName, , date] = dateFormatter.format(chosenDate).replace(",", "").split(" ");
//       const isWeekend = dayName === "Sat" || dayName === "Sun";
//       outputCalendarHTML += `<td class="outputItem ${isWeekend ? "weekend" : ""}">
//                 <span class="outputDay">${dayName.slice(0, -1)}</span>
//                 <span class="outputDate">${date}</span>
//                 </td>`;
//     }
//     outputCalendarHTML += `<td class="sumCell outputItem weekend">Sum</td>`;
//     outputCalendar.innerHTML = outputCalendarHTML;
//     const addVacationButton = this.component.querySelector(".addVacationBtn");
//     addVacationButton.addEventListener("click", this.popupWindowContext.show.bind(this.popupWindowContext));
//   }

//   updateTableHead(newDate) {
//     const daysInPreviousMonth = this.daysInCurrentMonth;
//     this.daysInCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
//     let daysList = Array.prototype.slice.call(this.component.querySelectorAll(".outputItem"));
//     daysList = daysList.splice(1, daysList.length - 2);
//     if (this.daysInCurrentMonth < daysInPreviousMonth) {
//       for (let index = this.daysInCurrentMonth; index < daysInPreviousMonth; index++) {
//         daysList[index].remove();
//       }
//     } else if (this.daysInCurrentMonth > daysInPreviousMonth) {
//       for (let index = daysInPreviousMonth; index < this.daysInCurrentMonth; index++) {
//         const newCell = document.createElement("td");
//         newCell.className = "outputItem";
//         newCell.innerHTML = `
//                                 <span class="outputDay"></span>
//                                 <span class="outputDate">${index + 1}</span>`;
//         daysList.push(newCell);
//         daysList[index - 1].after(newCell);
//       }
//     }
//     for (let index = 1; index <= this.daysInCurrentMonth; index++) {
//       const chosenDate = new Date(newDate.getFullYear(), newDate.getMonth(), index);
//       const [dayName] = dateFormatter.format(chosenDate).replace(",", "").split(" ");
//       daysList[index - 1].querySelector(".outputDay").textContent = dayName.slice(0, -1);
//       // eslint-disable-next-line no-unused-expressions
//       dayName === "Sat" || dayName === "Sun"
//         ? daysList[index - 1].classList.add("weekend")
//         : daysList[index - 1].classList.remove("weekend");
//     }
//     this.teamSumStats = [];
//     for (let index = 0; index < this.teamsContext.length; ++index) {
//       this.teamsContext[index].updateTeam(newDate);
//       this.increaseTeamSumStats(this.teamsContext[index].dayPersonStats);
//     }
//     this.foot.updateTeamFooter(this.teamSumStats);
//   }

//   increaseTeamSumStats(teamSumArray) {
//     if (this.teamSumStats.length === 0) {
//       this.teamSumStats = teamSumArray;
//     } else {
//       for (let index = 0; index < this.teamSumStats.length; ++index) {
//         if (this.teamSumStats[index] !== "weekend") {
//           this.teamSumStats[index] += teamSumArray[index];
//         }
//       }
//     }
//   }

//   render() {
//     for (let index = 0; index < departmentTeams.teams.length; index++) {
//       const team = new Team(this.component, departmentTeams.teams[index], this.daysInCurrentMonth, this.date);

//       this.teamsContext.push(team);
//       team.render();
//       this.increaseTeamSumStats(this.teamsContext[index].dayPersonStats);
//     }
//     this.generateTableHead();
//     super.render();
//   }
// }
