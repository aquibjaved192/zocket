'use client';

export default function NameFilter({ campaigns, handleSelectName, label, showEmptyOption }) {
  return (
    <div className="p-4 col-span-2 bg-white rounded-lg">
        <label className="text-black" htmlFor="campaign">{label}</label>
        <select
            id="campaign"
            onChange={handleSelectName}
            className="block w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
            {showEmptyOption && <option>--Select a campaign to compare--</option>}
            {campaigns.map((campaign) => (
                <option 
                key={campaign.campaign_id} 
                value={campaign.campaign_id}
                className="bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ease-in-out"
                >
                {campaign.campaign_name}
                </option>
            ))}
        </select>
    </div>
  );
}