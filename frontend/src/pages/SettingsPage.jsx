import { useEffect, useState } from 'react';
import client from '../api/client';

export default function SettingsPage() {
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    client.get('/preferences').then((res) => setPrefs(res.data));
  }, []);

  function toggle(field) {
    const updated = { ...prefs, [field]: !prefs[field] };
    setPrefs(updated);
    client.put('/preferences', updated);
  }

  if (!prefs) return null;

  return (
    <div>
      <label>
        <input type="checkbox" checked={prefs.trackEmotion} onChange={() => toggle('trackEmotion')} />
        Track emotion
      </label>
      <label>
        <input type="checkbox" checked={prefs.trackLocation} onChange={() => toggle('trackLocation')} />
        Track location
      </label>
      <label>
        <input type="checkbox" checked={prefs.trackTrigger} onChange={() => toggle('trackTrigger')} />
        Track trigger
      </label>
    </div>
  );
}