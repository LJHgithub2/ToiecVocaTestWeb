import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, addMonths, subMonths } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const dateFormat = "d";
  const days = [];
  let daysOfWeek = [];

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  allDays.forEach(day => {
    daysOfWeek.push(
      <td key={day} className="border p-1 h-40 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
        <div className="flex flex-col h-40 mx-auto overflow-hidden">
          <div className="top h-5 w-full">
            <span className="text-gray-500">{format(day, dateFormat)}</span>
          </div>
          <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
        </div>
      </td>
    );
    if (daysOfWeek.length === 7) {
      days.push(<tr key={day} className="text-center h-20">{daysOfWeek}</tr>);
      daysOfWeek = [];
    }
  });

  return (
    <div className="container mx-auto mt-10">
      <div className="wrapper bg-white rounded shadow w-full">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold">
            {format(currentMonth, "yyyy MMMM")}
          </span>
          <div className="buttons">
            <button onClick={handlePrevMonth} className="p-1">
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"/>
                <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
              </svg>
            </button>
            <button onClick={handleNextMonth} className="p-1">
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
                <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Sunday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Monday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Tuesday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Wednesday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Thursday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Friday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Saturday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {days}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
