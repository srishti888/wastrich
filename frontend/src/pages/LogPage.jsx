import { useEffect, useState } from 'react';
import client from '../api/client';
import EpisodeLogForm from '../components/EpisodeLogForm';

export default function LogPage() {
  const [episodes, setEpisodes] = useState([]);
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    client.get('/episodes').then((res) => setEpisodes(res.data));
    client.get('/preferences').then((res) => setPrefs(res.data));
  }, []);

  function handleCreated(episode) {
    setEpisodes((prev) => [episode, ...prev]);
  }

  if (!prefs) return null;

  return (
    <div>
      <EpisodeLogForm prefs={prefs} onCreated={handleCreated} />
      <ul>
        {episodes.map((ep) => (
          <li key={ep.id}>
            {ep.targetArea} {ep.isBlip ? '(blip)' : ''} — {new Date(ep.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}