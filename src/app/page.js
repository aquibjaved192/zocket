import Header from "../components/Header";
import CampaignData from "../components/CampaignData";

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/campaign');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function Home() {
  const data = await fetchData();
  return (
    <>
      <Header />
      <CampaignData data={data}/>
    </>
  );
}
