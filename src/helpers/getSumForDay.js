  function getSumsVocationForDay() {
    cleanSumArray(sumVacationForDay);

    arrDays.forEach((day) => {
      let count = 0;
      users.forEach((user) => {

        if (user.vacation.length > 0) {

          user.vacation.forEach((vacation) => {
            const currentMonthandYear = day.fullDate.slice(3, 10);
            const vacationMonthandYear = vacation.startDate.slice(3, 10);

            if (vacationMonthandYear ===  currentMonthandYear) {
              let startDay = vacation.startDate.slice(0,2);
              let endDay = vacation.endDate.slice(0,2);

              if(day.dayOfMonth >=  Number(startDay) && day.dayOfMonth <= Number(endDay) && !day.isDayOff){
                day.isVacDay = true;
                count++
              }
            }
          })
        }
      })
    sumVacationForDay.push(count);
    })
  return sumVacationForDay;
  }

function cleanSumArray(array){
  while(array.length > 0) {
    array.pop();
  }
}