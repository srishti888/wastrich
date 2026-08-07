import { useEffect, useState } from 'react';
import client from '../api/client';
import TrendChart from '../components/TrendChart';
import Heatmap from '../components/Heatmap';

export default function ProgressPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    client.get('/episodes/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <div>
      <p>Total episodes: {stats.totalCount} (blips: {stats.blipCount})</p>
      <TrendChart data={stats.trend} />
      <Heatmap hourly={stats.hourly} />
    </div>
  );
}