'use client';
import DateRangeFilter from './date';
import NameFilter from './name';

export default function Filters({ campaigns, handleSelectName, handleDateFilter }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <NameFilter label="Select Campaign Name" campaigns={campaigns} handleSelectName={handleSelectName} />
      <div className="p-2 md:p-4 bg-white rounded-lg">
        <DateRangeFilter onFilter={handleDateFilter} />
      </div>
    </div>
  );
}