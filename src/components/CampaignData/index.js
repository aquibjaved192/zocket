'use client';
import CampaignPanel from "../CampaignPanel";
import Charts from "../Charts";
import React, { useEffect, useState } from 'react';
import Filters from "../Filters";

const CampaignData = ({ data }) => {
  const { campaigns } = data;
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
      setGraphData(handleGraphData('impressions', selectedCampaign));
  }, [selectedCampaign])

  const handleTotalCalculations = (campaign, key) => {
    return campaign.metrics.reduce((value, campaign) => value + campaign[key], 0);
  }

  const handleTotalMetrics = (campaign) => {
    return {
      impressions: handleTotalCalculations(campaign, 'impressions'),
      clicks: handleTotalCalculations(campaign, 'clicks'),
      conversions: handleTotalCalculations(campaign, 'conversions'),
      cost: handleTotalCalculations(campaign, 'cost'),
      ctr: handleTotalCalculations(campaign, 'ctr'),
      cpc: handleTotalCalculations(campaign, 'cpc'),
      conversion_rate: handleTotalCalculations(campaign, 'conversion_rate'),
      cost_per_conversion: handleTotalCalculations(campaign, 'cost_per_conversion'),
    }
  }

  const [selectedMetricByDate, setSelectedMetricByDate] = useState(handleTotalMetrics(selectedCampaign));

  const handleSelectName = (e) => {
    const findCampaign = campaigns.find(campaign => campaign.campaign_id === e.target.value);
    setSelectedCampaign(findCampaign);
    setSelectedMetricByDate(handleTotalMetrics(findCampaign));
  };

  const handleGraphData = (cardKey) => {
    const data = selectedCampaign.metrics.map(item => (
      { date: item.date, [cardKey]: item[cardKey] }
    ))
    return { data, cardKey};
  }

  const handleDateFilter = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      const campaign = {...selectedCampaign};
      const data = [...campaign.metrics];
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
      campaign.metrics = filtered;
      setSelectedCampaign(campaign);
      setSelectedMetricByDate(handleTotalMetrics(campaign));
    } else {
      setSelectedCampaign(selectedCampaign);
    }
  };

  const flattenObject = (obj, parent = '', res = {}) => {
    for (let key in obj) {
      const propName = parent ? `${parent}_${key}` : key;

      if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          flattenObject(item, `${item.date}`, res);
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key].toString();
      }
    }
    return res;
  };

  const convertToCSV = (data) => {
    const csvRows = [];
    const flatData = data.map(item => flattenObject(item));
    const headers = Object.keys(flatData[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(',')); 
    }

    return csvRows.join('\n'); 
  };

  const downloadCSV = () => {
    const csvData = convertToCSV([{ 
      campaignName: selectedCampaign.campaign_name, 
      start: selectedCampaign.start_date, 
      end: selectedCampaign.end_date,
      ...selectedMetricByDate,
    }]);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="h-screen p-4 bg-gray-100">
      <Filters campaigns={campaigns} handleDateFilter={handleDateFilter} handleSelectName={handleSelectName} />
      <CampaignPanel selectedMetricByDate={selectedMetricByDate} handleGraphData={handleGraphData} />
      <Charts 
        downloadCSV={downloadCSV} 
        campaigns={campaigns.filter(item => item.campaign_id !== selectedCampaign.campaign_id)} 
        campaignName={selectedCampaign.campaign_name} 
        graphData={graphData} 
        setGraphData={setGraphData} 
      />
    </div>
  );
};

export default CampaignData;
