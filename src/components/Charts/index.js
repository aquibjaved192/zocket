'use client';
import { useState } from 'react';
import { Droppable } from 'react-drag-and-drop';
import { Bar, Line } from "react-chartjs-2";
import RadioButton from '../RadioButton';
import NameFilter from '../Filters/name';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
);

export default function Charts({ graphData, setGraphData, campaignName, campaigns, downloadCSV }) {
  const [chartType, setChartType] = useState('bar');
  const [axis, setAxis] = useState('x');
  const [compareCampaign, setCompareCampaign] = useState(null);
  const [compareData, setCompareData] = useState(null);

  const onDrop = (data) => {
    const graphData = JSON.parse(data.metric)
    setGraphData(graphData);
    if(compareCampaign){
      handleCompareData(compareCampaign, graphData.cardKey);
    }
  }

  const handleLabelsData = () => {
    return graphData?.data.map(item => item.date);
  }

  const handleDataSet = () => {
    return graphData?.data.map(item => item[graphData.cardKey]);
  }

  const data = {
    labels: handleLabelsData(),
    datasets: [
      {
        label: campaignName,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: handleDataSet(),
      }
    ],
  };

  if(compareData) {
    data.datasets.push({
      label: compareData?.compareCampaignName,
      backgroundColor: 'rgba(192, 192, 100, 0.6)',
      borderColor: 'rgba(192, 192, 100, 0.6)',
      borderWidth: 1,
      data: compareData?.data?.map(item => item[graphData?.cardKey]),
    })
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${graphData?.cardKey}'s data for ${campaignName} ${compareData && `& ${compareData.compareCampaignName}`}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    indexAxis: axis,
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleAxisChange = (e) => {
    setAxis(e.target.value);
  }

  const handleCompareName = (e) => {
    const findCampaign = campaigns.find(campaign => campaign.campaign_id === e.target.value);
    setCompareCampaign(findCampaign);
    handleCompareData(findCampaign, graphData?.cardKey);
  };

  const handleCompareData = (findCampaign, key) => {
    const data = findCampaign.metrics.map(item => (
      { date: item.date, [key]: item[key] }
    ))
    setCompareData({ data, compareCampaignName: findCampaign.campaign_name });
  }

  return (
    <div className=''>
      <div className='flex flex-wrap flex-col md:flex-row md:gap-4 mb-4'>
        <div className="mt-4 bg-white p-4 flex space-x-4 text-black rounded-lg">
          <RadioButton checked={chartType === "bar"} label="Bar Graph" value="bar" handleChange={handleChartTypeChange}/>
          <RadioButton checked={chartType === "line"} label="Line Graph" value="line" handleChange={handleChartTypeChange}/>
        </div>
        <div className="mt-4 bg-white p-4 flex space-x-4 text-black rounded-lg">
          <RadioButton checked={axis === "x"} label="x-axis" value="x" handleChange={handleAxisChange}/>
          <RadioButton checked={axis === "y"} label="y-axis" value="y" handleChange={handleAxisChange}/>
        </div>
        <div className="mt-4">
          <NameFilter showEmptyOption={true} campaigns={campaigns} handleSelectName={handleCompareName} label="" />
        </div>
        <button
          onClick={downloadCSV}
          className="mt-4 py-4 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Download Report
        </button>
      </div>
      <Droppable types={['metric']} onDrop={onDrop} className="bg-white p-4 flex-grow flex items-center justify-center">
        {chartType === 'bar' ? (
            <Bar data={data} options={options} />
          ) : chartType === 'line' ? (
            <Line data={data} options={options} />
          ) : null}
      </Droppable>
    </div>
  );
}
