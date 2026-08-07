import { useState } from 'react';
import client from '../api/client';

const empty = { targetArea: '', triggerTag: '', emotionTag: '', locationTag: '', isBlip: false };

export default function EpisodeLogForm({ prefs, onCreated }) {
  const [form, setForm] = useState(empty);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data } = await client.post('/episodes', form);
    setForm(empty);
    onCreated(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.targetArea} onChange={(e) => update('targetArea', e.target.value)} placeholder="target area" required />
      {prefs.trackTrigger && (
        <input value={form.triggerTag} onChange={(e) => update('triggerTag', e.target.value)} placeholder="trigger" />
      )}
      {prefs.trackEmotion && (
        <input value={form.emotionTag} onChange={(e) => update('emotionTag', e.target.value)} placeholder="emotion" />
      )}
      {prefs.trackLocation && (
        <input value={form.locationTag} onChange={(e) => update('locationTag', e.target.value)} placeholder="location" />
      )}
      <label>
        <input type="checkbox" checked={form.isBlip} onChange={(e) => update('isBlip', e.target.checked)} />
        blip
      </label>
      <button type="submit">Log episode</button>
    </form>
  );
}