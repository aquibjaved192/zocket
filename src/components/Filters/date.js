'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangeFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilter = () => {
    onFilter({ startDate, endDate });
  };

  return (
    <div className="flex flex-col">
      <label className="text-black" htmlFor="campaign">Date</label>
      <div className='flex flex-col md:flex-row md:gap-4 lg:flex-row'>
        <div className="flex space-x-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <button
          onClick={handleFilter}
          className="px-4 py-2 mt-2 md:mt-0 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
