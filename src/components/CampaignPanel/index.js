import MetricCard from "../MetricCard";

export default function CampaignPanel({ selectedMetricByDate, handleGraphData }) {
  return (
    <div className='p-4 bg-white rounded-lg shadow-lg mt-4'>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <MetricCard handleGraphData={handleGraphData} cardKey="impressions" title="Impressions" value={selectedMetricByDate.impressions} />
            <MetricCard handleGraphData={handleGraphData} cardKey="clicks" title="Clicks" value={selectedMetricByDate.clicks} />
            <MetricCard handleGraphData={handleGraphData} cardKey="conversions" title="Conversions" value={selectedMetricByDate.conversions} />
            <MetricCard handleGraphData={handleGraphData} cardKey="cost" title="Cost ($)" value={`$${selectedMetricByDate.cost.toFixed(2)}`} />
            <MetricCard handleGraphData={handleGraphData} cardKey="ctr" title="CTR (%)" value={`${selectedMetricByDate.ctr.toFixed(2)}%`} />
            <MetricCard handleGraphData={handleGraphData} cardKey="cpc" title="CPC ($)" value={`$${selectedMetricByDate.cpc.toFixed(2)}`} />
            <MetricCard handleGraphData={handleGraphData} cardKey="conversion_rate" title="Conversion Rate (%)" value={`${selectedMetricByDate.conversion_rate.toFixed(2)}%`} />
            <MetricCard handleGraphData={handleGraphData} cardKey="cost_per_conversion" title="Cost per Conversion ($)" value={`$${selectedMetricByDate.cost_per_conversion.toFixed(2)}`} />
        </div>
     </div>
  );
}