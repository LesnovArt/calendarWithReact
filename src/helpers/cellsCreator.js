import React from "react";
import moment from "moment";
  
export function createCells(date, memberId = 0) {
  const arrDays = [];
  const daysInCurrentMonth = date.clone().endOf("month").format("DD");
  const currentDay = moment(date);

  for (let i = 0; i < Number(daysInCurrentMonth); i++) {
    const isWeekend = currentDay.format('dd') === "Sa" || currentDay.format('dd') === "Su";
    const day = {
      fullDate:currentDay.format('DD.MM.YYYY'),
      dayOfMonth: Number(currentDay.format('D')),
      dayName: currentDay.format('dd'),
      isDayOff: isWeekend,
      memberId: memberId
    }
    currentDay.add(1,'d');
    arrDays.push(day);
  }
  return arrDays;
}