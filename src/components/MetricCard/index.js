'use client';

import { Draggable } from 'react-drag-and-drop'
const MetricCard = ({ title, value, cardKey, handleGraphData }) => {
  return (
    <Draggable type="metric" data={JSON.stringify(handleGraphData(cardKey))} className="p-4 bg-gray-100 rounded-lg shadow-lg flex flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </Draggable>
  );
};

export default MetricCard;

