import React, { useEffect, useState, useContext } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';

const MainContent = () => {
  const { core40SDK } = useContext(ExtensionContext);
  const [artistName, setArtistName] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await core40SDK.ok(core40SDK.me());
        setArtistName(user.display_name);

        // Fetch analytics data here
        // This is a placeholder - replace with actual Looker SDK calls
        const data = await core40SDK.ok(core40SDK.run_inline_query({
          result_format: 'json',
          body: {
            total_streams: '{{ total_streams._value }}',
            monthly_listeners: '{{ monthly_listeners._value }}',
            total_revenue: '{{ total_revenue._value }}',
            top_track: '{{ top_track._value }}'
          }
        }));
        setAnalyticsData(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main-content">
      <h2>Welcome, {artistName}</h2>
      <div className="analytics-overview">
        <div className="analytics-card">
          <h3>Total Streams</h3>
          <p>{analyticsData.total_streams}</p>
        </div>
        <div className="analytics-card">
          <h3>Monthly Listeners</h3>
          <p>{analyticsData.monthly_listeners}</p>
        </div>
        <div className="analytics-card">
          <h3>Total Revenue</h3>
          <p>${analyticsData.total_revenue}</p>
        </div>
        <div className="analytics-card">
          <h3>Top Track</h3>
          <p>{analyticsData.top_track}</p>
        </div>
      </div>
      {/* Add more sections for detailed analytics here */}
    </main>
  );
};